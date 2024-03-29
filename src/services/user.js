/** 
 * user  service
 */

const {
    User
} = require('../db/model/index')
const {
    formatUser
} = require('./_format')

/** 
 * 获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
    //查询条件
    const whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, {
            password
        })
    }

    //查询
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'], //需要查询出来的列
        where: whereOpt
    })
    if (result == null) {
        //未找到
        return result;
    }

    //格式化
    const formatRes = formatUser(result.dataValues)

    return formatRes;
}

/** 
 * 创建用户
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别
 * @param {string} nickName 昵称
 */
async function createUser({
    userName,
    password,
    gender = 3,
    nickName
}) {
    const result = await User.create({
        userName,
        password,
        gender,
        nickName: nickName ? nickName : userName
    })
    return result.dataValues
}

//更新用户信息
async function updateUser({
    newPassword,
    newNickName,
    newPicture,
    newCity
}, {
    userName,
    password
}) {
    //拼接修改内容
    const updateData = {};
    if (newPassword) {
        updateData.password = newPassword;
    }
    if (newNickName) {
        updateData.nickName = newNickName;
    }
    if (newPicture) {
        updateData.picture = newPicture;
    }
    if (newCity) {
        updateData.city = newCity;
    }

    //拼接查询条件
    const whereData = {
        userName
    }
    if (password) {
        whereData.password = password
    }

    //执行修改
    const result = await User.update(updateData, {
        where: whereData
    })

    return result[0] > 0; //修改行数
}

module.exports = {
    getUserInfo,
    createUser,
    updateUser
}