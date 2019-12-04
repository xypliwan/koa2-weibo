//修改
const {
    Blog,
    User
} = require('./model');

!(async () => {

    const updateRes = await User.update({
        nickName: '张三11' //需要修改后的内容
    }, {
        where: {
            userName: 'zhangsan' // 条件
        }
    })
    // console.log('updateRes',updateRes[0] > 0)  // >0  修改成功

})()