import { createController } from 'awilix-koa'

/**
 * more info about [`awilix-koa`] (https://github.com/jeffijoe/awilix-koa#awesome-usage) 
 * more info about [`awilix-router`] (https://github.com/jeffijoe/awilix-router-core)
 * exports a "controller" that `awilix-koa` use for routing. 
 * 返回路由控制器供`awilix-koa` 使用路由
 */

const api = userService => ({
  login: async ctx => ctx.ok(await userService.login(ctx.request.body)),
  register: async ctx =>
    ctx.created(await userService.register(ctx.request.body)),
})

export default createController(api)
  .prefix('/public/user')
  .post('/login', 'login')
  .post('/logout', 'logout')
  .post('/register', 'register')
