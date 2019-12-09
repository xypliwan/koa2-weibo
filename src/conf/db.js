/** 
 * @description 存储配置
 * @author xyp
 */
const {
    isProd,
} = require('../utils/env')

let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}

let MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456789',
    port: '3306',
    database: 'weibo_db'
}

if (isProd) {
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
    //线上mysql配置
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456789',
        port: '3306',
        database: 'weibo_db'
    }
}

module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}