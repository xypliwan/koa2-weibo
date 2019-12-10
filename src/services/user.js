/** 
 * user  service
 */

const {
    User
} = require('../db/model/index')

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

    return result.dataValues;
}

module.exports = {
    getUserInfo
}