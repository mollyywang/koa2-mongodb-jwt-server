import { asValue } from 'awilix'

/**
 * add request-specific data to the scope 登录后记录用户名
 */

export async function registerContext(ctx, next) {
  ctx.state.container.register({
    userContext: asValue({
      user: 'username'
    })
  })
  return next()
}
