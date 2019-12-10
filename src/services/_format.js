/** 
 * 数据格式化
 */

/** 
 * 用户默认头像
 * @param {Object} obj 用户对象 
 */
function _formatUserPicture(obj) {
    if (obj.picture == null) {
        obj.picture = 'https://dwz.cn/rnTnftZs'
    }
    return obj
}


/** 
 * 格式化用户信息
 * @param {Array|Object} list 用户列表或者单个用户对象
 */
function formatUser(list) {
    if (list == null) {
        return list;
    }
    if (list instanceof Array) {
        return list.map(_formatUserPicture)
    }

    //单个对象
    return _formatUserPicture(list)
}

module.exports = {
    formatUser
}