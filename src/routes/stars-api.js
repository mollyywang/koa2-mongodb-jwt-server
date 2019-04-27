import { createController } from 'awilix-koa'

// This is our API controller.
// All it does is map HTTP calls to service calls.
// This way our services could be used in any type of app, not
// just over HTTP.
const api = starService => ({
  findStars: async ctx => {
    const userId = ctx.state.user.data._id;
    ctx.ok(await starService.findStars(userId))
  },
  addStar: async ctx =>
    {
    const userId = ctx.state.user.data._id;
      // const userId = '5cbebd4ef70071bd7aa417d8'
      ctx.ok(await starService.addStar(userId,ctx.request.body))
    },
  removeStar: async ctx =>
   {
    const userId = ctx.state.user.data._id;
    // const userId = '5cbebd4ef70071bd7aa417d8'
    ctx.ok(await starService.removeStar(userId,ctx.params.id))
  }
})

// Maps routes to method calls on the `api` controller.
// See the `awilix-router-core` docs for info:
// https://github.com/jeffijoe/awilix-router-core
export default createController(api)
  .prefix('/star')
  .get('/starlist', 'findStars')
  .post('/add', 'addStar')
  .get('/remove/:id', 'removeStar')
