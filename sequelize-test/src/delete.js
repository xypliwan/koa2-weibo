//删除
const {
    Blog,
    User
} = require('./model');

!(async () => {

    // const deleteBlogRes = await Blog.destroy({
    //     where: {
    //         id: 4 //删除 id = 4的博客
    //     }
    // })
    // console.log('deleteBlogRes', deleteBlogRes > 0) // >0  修改成功

    //删除用户，如果做了外键，会把改用户下的所有博客删除掉
    const deleteUserRes = await User.destroy({
        where: {
            id: 1 //删除 id = 1的用户
        }
    })
    console.log('deleteUserRes', deleteUserRes) // >0  修改成功




})()