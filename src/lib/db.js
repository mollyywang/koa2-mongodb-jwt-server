'use strict'

// const fs = require('fs')
// const path = require('path')
import mongoose from 'mongoose'
const dbConn = 'mongodb://localhost/pricer'

/**
 * mongoose连接数据库
 * @type {[type]}
 */
export function dbconnect(){

    mongoose.Promise = require('bluebird')
    mongoose.connect(dbConn)
    // 取得默认连接
    const db = mongoose.connection

    // 将连接与错误事件绑定（以获得连接错误的提示）
    db.on('error', console.error.bind(console, 'MongoDB 连接错误：'))

    return db
}
