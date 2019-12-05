const Sequelize = require('sequelize');

const conf = {
    host: 'localhost',
    dialect: 'mysql' //连接什么类型的数据库
}

conf.pool = {
    max:5,      //连接池最大的连接数
    min:0,          //最小的
    idle:10000,     //如果一个连接池  10s 之内 未被使用，则释放

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