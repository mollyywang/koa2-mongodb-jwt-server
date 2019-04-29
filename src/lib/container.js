import { createContainer, Lifetime, InjectionMode, asValue } from 'awilix'
import { logger } from './logger'

/**
 * Configures a new container 配置容器 
 *
 * @return {Object} The container.
 */

const modulesToLoad = [
  ['services/*.js', Lifetime.SCOPED],
  ['stores/*.js', Lifetime.SINGLETON]
]

export function configureContainer() {
  const opts = {
    injectionMode: InjectionMode.CLASSIC
  }
  return createContainer(opts)
    // load modules and registers 加载，注册模块 e.g. import userService from `services/user-service.js` 
    .loadModules(modulesToLoad, {
      cwd: `${__dirname}/..`,
      formatName: 'camelCase'
    })
    .register({
      // construct logger 
      logger: asValue(logger)
    })
}
