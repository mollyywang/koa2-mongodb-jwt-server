
import mongoose from 'mongoose'
const dbConn = 'mongodb://localhost/pricer'

/**
 * mongoose connect database 连接数据库
 * @type {[type]}
 */

export function dbconnect() {

    mongoose.Promise = require('bluebird')
    mongoose.connect(dbConn)
    const db = mongoose.connection
    // catch err 绑定错误处理
    db.on('error', console.error.bind(console, 'MongoDB 连接错误：'))

    return db
}
