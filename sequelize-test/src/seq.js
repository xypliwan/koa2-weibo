const Sequelize = require('sequelize');

const conf = {
    host: 'localhost',
    dialect: 'mysql' //连接什么类型的数据库
}

//arg： 数据库名  用户名   密码  
const seq = new Sequelize('weibo_db', 'root', '123456789', conf)

//测试连接
// seq.authenticate().then(() => {
//     console.log('数据库连接成功')
// }).catch(() => {
//     console.log('数据库连接失败')
// })

module.exports = seq;