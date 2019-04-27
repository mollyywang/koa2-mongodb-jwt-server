import { Bristol } from 'bristol'
import palin from 'palin'
import { env } from './env'

export const logger = new Bristol()

/* istanbul ignore next */
if (env.LOG_LEVEL !== 'off') {
  logger.addTarget('console').withFormatter(palin, {
    rootFolderName: 'Pricer-Server-v2' // Edit this to match your actual foldername
  })
}
