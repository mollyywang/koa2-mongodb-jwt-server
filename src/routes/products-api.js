import { createController } from 'awilix-koa'

/**
 * more info about [`awilix-koa`] (https://github.com/jeffijoe/awilix-koa#awesome-usage) 
 * more info about [`awilix-router`] (https://github.com/jeffijoe/awilix-router-core)
 * exports a "controller" that `awilix-koa` use for routing. 
 * 返回路由控制器供`awilix-koa` 使用路由
 */

const api = productService => ({
  getProduct: async ctx => ctx.ok(await productService.get(ctx.params.id)),
  getList: async ctx => {
    ctx.ok(await productService.getList(ctx.request.body))
  },
  createProduct: async ctx =>
    ctx.created(await productService.create(ctx.request.body)),

})


export default createController(api)
  .prefix('/public/products')
  .get('/get/:id', 'getProduct')
  .post('/create', 'createProduct')
  .post('/getlist', 'getlist')
