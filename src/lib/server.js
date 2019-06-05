import * as http from 'http'
import Koa from 'koa'
import cors from 'koa2-cors'
import respond from 'koa-respond'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import jwt from 'koa-jwt'
import { scopePerRequest, loadControllers } from 'awilix-koa'

import { logger } from './logger'
import { configureContainer } from './container'
import { dbconnect } from './db'
import { env } from './env'

import { errorHandler } from '../middleware/error-handler'
import { notFoundHandler } from '../middleware/not-found'

/**
 * Creates a new Koa application 创建应用并返回
 * @return {Promise<http.Server>} 
*/

export async function createServer() {
  logger.debug('Creating server...')
  const app = new Koa()
  const container = (app.container = configureContainer())
  app.keys = ['Molly']

  // use cors to enable cross-domain 允许跨域
  app.use(cors({
    origin: function (ctx) {
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

  // Custom 401 handling 处理401错误
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

  //use jwt to secret 使用jwt加密
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
    // .use(notFoundHandler)

    // Adds ctx.ok(), ctx.notFound(), etc..
    .use(respond())
    // Parses request bodies.
    .use(bodyParser())
    // Creates an Awilix scope per request. Check out the awilix-koa
    // docs for details: https://github.com/jeffijoe/awilix-koa
    .use(scopePerRequest(container))
    // load routes 
    .use(loadControllers('../routes/*.js', { cwd: __dirname }))

  //open database 开启数据库
  dbconnect()

  // Create http server 开启服务
  const server = http.createServer(app.callback())
  // Add a `close` event listener 监听应用关闭
  server.on('close', () => {
    // tear down database connections, etc.
    logger.debug('Server closing, bye!')
  })
  logger.debug('Server created, ready to listen', { scope: 'startup' })
  return server
}
