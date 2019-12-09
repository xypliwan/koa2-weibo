/** 
 * 同步数据库
 */
const seq = require('./seq');


//测试连接
seq.authenticate().then(() => {
    console.log('数据库连接成功')
}).catch(() => {
    console.log('数据库连接失败')
})

//执行表同步
//force:true 表示如果数据库中已有要插入的表，则强制性覆盖，否则添加
seq.sync({
    force: true
}).then(() => {
    console.log('同步ok')
    process.exit()
})