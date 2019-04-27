import * as http from 'http'
import Koa from 'koa'
import cors from 'koa2-cors'
import respond from 'koa-respond'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import { scopePerRequest, loadControllers } from 'awilix-koa'

import { logger } from './logger'
import { configureContainer } from './container'
import { dbconnect } from './db'
// import { notFoundHandler } from '../middleware/not-found'
import { errorHandler } from '../middleware/error-handler'
import { registerContext } from '../middleware/register-context'

import { env } from './env'
import jwt from 'koa-jwt'


/**
 * Creates and returns a new Koa application.
 * Does *NOT* call `listen`!
 *
 * @return {Promise<http.Server>} The configured app.
 */
export async function createServer() {
  logger.debug('Creating server...')
  const app = new Koa()

  // Container is configured with our services and whatnot.
  const container = (app.container = configureContainer())

app.use(cors({
  origin: function(ctx) {
    if (ctx.url === '/test') {
      return false;
    }
    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.keys = ['Molly']

// Custom 401 handling
app.use(async function (ctx, next) {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      let errMessage = err.originalError ?
        err.originalError.message :
        err.message
      ctx.body = {
        error: errMessage
      };
      ctx.set("X-Status-Reason", errMessage)
    } else {
      throw err;
    }
  });
});

  app.use(jwt({
    secret: env.SECRET
  }).unless({
    path: [/^\/public/, "/"]
  }));

  app
    // Top middleware is the error handler.
    .use(errorHandler)
    // Compress all responses.
    .use(compress())
    // Adds ctx.ok(), ctx.notFound(), etc..
    .use(respond())
    // Parses request bodies.
    .use(bodyParser())
    // Creates an Awilix scope per request. Check out the awilix-koa
    // docs for details: https://github.com/jeffijoe/awilix-koa
    .use(scopePerRequest(container))
    // Create a middleware to add request-specific data to the scope.
    .use(registerContext)
    // Load routes (API "controllers")
    .use(loadControllers('../routes/*.js', { cwd: __dirname }))

  //开启数据库
  dbconnect()

  // Creates a http server ready to listen.
  const server = http.createServer(app.callback())

  // Add a `close` event listener so we can clean up resources.
  server.on('close', () => {
    // You should tear down database connections, TCP connections, etc
    // here to make sure Jest's watch-mode some process management
    // tool does not release resources.
    logger.debug('Server closing, bye!')
  })

  logger.debug('Server created, ready to listen', { scope: 'startup' })
  return server
}
