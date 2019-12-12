/** 
 * user controller
 */

const {
    getUserInfo,
    createUser,
    updateUser
} = require('../services/user')
const {
    SuccessModel,
    ErrorModel
} = require('../model/ResModel')
const {
    registerUserNameExistInfo,
    registerUserNameNotExistInfo,
    registerFailInfo,
    loginFailInfo,
    changeInfoFailInfo,
    changePasswordFailInfo
} = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')

/** 
 * 用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName);
    if (userInfo) {
        //已存在
        return new SuccessModel(userInfo)

    } else {
        //不存在
        return new ErrorModel(registerUserNameNotExistInfo)
    }

}

/** 
 * 注册
 * @param { string } userName  用户名
 * @param { string } password  密码
 * @param { number } gender  性别  1男  2女  3保密
 */
async function register({
    userName,
    password,
    gender
}) {
    const userInfo = await getUserInfo(userName);
    if (userInfo) {
        return new ErrorModel(registerUserNameExistInfo)
    }
    //注册
    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender
        })
        return new SuccessModel()
    } catch (ex) {
        console.error(ex.message, ex.stack, '注册失败')
        return new ErrorModel(registerFailInfo)
    }
}

/** 
 * 登录
 * @param { Object } ctx  koa2 ctx
 * @param { string } userName 用户名
 * @param { string } password 密码
 */
async function login(ctx, userName, password) {
    //登录成功  ctx.session.userInfo = xxx用户信息
    const userInfo = await getUserInfo(userName, doCrypto(password))
    if (!userInfo) {
        //登录失败
        return new ErrorModel(loginFailInfo)
    }

    //登录成功
    if (ctx.session.userInfo == null) {
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel()
}

//修改个人信息
async function changeInfo(ctx, {
    nickName,
    city,
    picture
}) {
    const {
        userName
    } = ctx.session.userInfo;
    if (!nickName) {
        nickName = userName;
    }

    const result = await updateUser({
        newNickName: nickName,
        newCity: city,
        newPicture: picture
    }, {
        userName
    })

    if (result) {
        //执行成功
        Object.assign(ctx.session.userInfo, {
            nickName,
            city,
            picture
        })

        return new SuccessModel()
    }
    //失败
    return new ErrorModel(changeInfoFailInfo)

}

//修改密码
async function changePassword(userName, password, newPassword) {
    const result = await updateUser({
        newPassword: doCrypto(newPassword)
    }, {
        userName,
        password: doCrypto(password)
    })

    if (result) {
        //成功
        return new SuccessModel()
    }

    //失败
    return new ErrorModel(changePasswordFailInfo)
}

//退出登录
async function logout(ctx) {
    delete ctx.session.userInfo;
    return new SuccessModel();
}

module.exports = {
    isExist,
    register,
    login,
    changeInfo,
    changePassword,
    logout
}