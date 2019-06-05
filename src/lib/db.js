
import mongoose from 'mongoose'
import { env } from './env'

/**
 * mongoose connect database 连接数据库
 * @type {[type]}
 */

export function dbconnect() {
    console.log(env)

    mongoose.Promise = require('bluebird')
    mongoose.connect(env.DBCONN)
    const db = mongoose.connection
    // catch err 绑定错误处理
    db.on('error', console.error.bind(console, 'MongoDB 连接错误：'))

    return db
}
