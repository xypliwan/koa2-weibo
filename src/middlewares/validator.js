/** 
 * json chema 验证中间件
 */

const {
    ErrorModel
} = require('../model/ResModel');
const {
    jsonSchemaFileInfo
} = require('../model/ErrorInfo')

/** 
 * 生成json schema 验证的中间件
 * @param { function } validataFn 验证函数
 */
function genValidator(validataFn) {
    //定义中间件函数
    async function validator(ctx, next) {
        const data = ctx.request.body
        //校验
        const error = validataFn(data)
        if (error) {
            console.log(error,'errrrr')
            //验证失败
            ctx.body = new ErrorModel(jsonSchemaFileInfo);
            return
        }
        //验证成功，继续往下走
        await next()
    }

    //返回中间件
    return validator;
}

module.exports = {
    genValidator
}