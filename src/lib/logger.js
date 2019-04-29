import { Bristol } from 'bristol'
import palin from 'palin'
import { env } from './env'

/** 
 * logger config  配置日志
 */

export const logger = new Bristol()

if (env.LOG_LEVEL !== 'off') {
  logger.addTarget('console').withFormatter(palin, {
    // Edit this as your folder name 这里改成自己的文件夹名
    rootFolderName: 'Pricer-Server-v2'
  })
}
