/** 
 * user controller
 */

const {
    getUserInfo,
    createUser
} = require('../services/user')
const {
    SuccessModel,
    ErrorModel
} = require('../model/ResModel')
const {
    registerUserNameExistInfo,
    registerUserNameNotExistInfo,
    registerFailInfo,
    loginFailInfo
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
async function login(ctx,userName,password) {
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

module.exports = {
    isExist,
    register,
    login
}