/** 
 * 封装 sequelize 数据类型
 */

const Sequelize = require('sequelize');

module.exports = {
    STRING: Sequelize.STRING, //字符串
    DECIMAL: Sequelize.DECIMAL, //超小数  eg: 0  /  1
    TEXT: Sequelize.TEXT, //文本
    INTEGER: Sequelize.INTEGER, //整数
    BOOLEAN: Sequelize.BOOLEAN //布尔值

}