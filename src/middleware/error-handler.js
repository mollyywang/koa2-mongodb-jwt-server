import { logger } from '../lib/logger'
import { env } from '../lib/env'

/**
 * Error handler middleware 错误中间件
 * Uses status code 使用状态码标示错误
 */

export async function errorHandler(ctx, next) {
  try {
    await next()
  } catch (err) {
    ctx.status = err.statusCode || 500
    ctx.body = err.toJSON ? err.toJSON() : { message: err.message, ...err }
    if (!env.EMIT_STACK_TRACE) {
      delete ctx.body.stack
    }
    logger.error('Error in request', err)
  }
}
