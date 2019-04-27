import { createController } from 'awilix-koa'

// This is our API controller.
// All it does is map HTTP calls to service calls.
// This way our services could be used in any type of app, not
// just over HTTP.
const api = productService => ({
  getProduct: async ctx => ctx.ok(await productService.get(ctx.params.id)),
  getlist: async ctx => {
    ctx.ok(await productService.getlists(ctx.request.body))
  },
  createProduct: async ctx =>
    ctx.created(await productService.create(ctx.request.body)),
  updateProduct: async ctx =>
    ctx.ok(await productService.update(ctx.params.id, ctx.request.body)),
  removeProducts: async ctx =>
    ctx.noContent(await productService.remove(ctx.params.id))
})

// Maps routes to method calls on the `api` controller.
// See the `awilix-router-core` docs for info:
// https://github.com/jeffijoe/awilix-router-core
export default createController(api)
  .prefix('/public/products')
  .get('/get/:id', 'getProduct')
  // .post('/create', 'createProduct')
  .post('/getlist', 'getlist')
