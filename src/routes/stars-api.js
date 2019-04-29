import { createController } from 'awilix-koa'

/**
 * more info about [`awilix-koa`] (https://github.com/jeffijoe/awilix-koa#awesome-usage) 
 * more info about [`awilix-router`] (https://github.com/jeffijoe/awilix-router-core)
 * exports a "controller" that `awilix-koa` use for routing. 
 * 返回路由控制器供`awilix-koa` 使用路由
 */

const api = starService => ({
  findStars: async ctx => {
    const userId = ctx.state.user.data._id;
    ctx.ok(await starService.findStars(userId))
  },
  addStar: async ctx => {
    const userId = ctx.state.user.data._id;
    ctx.ok(await starService.addStar(userId, ctx.request.body))
  },
  removeStar: async ctx => {
    const userId = ctx.state.user.data._id;
    ctx.ok(await starService.removeStar(userId, ctx.params.id))
  }
})

export default createController(api)
  .prefix('/star')
  .get('/starlist', 'findStars')
  .post('/add', 'addStar')
  .get('/remove/:id', 'removeStar')
