/** 
 * 首页 controller
 */

const xss = require('xss')
const {
    SuccessModel,
    ErrorModel
} = require('../model/ResModel')
const {
    createBlogFailInfo
} = require('../model/ErrorInfo')

const {
    createBlog
} = require('../services/blog');


/** 
 * 创建微博
 */
async function create({
    userId,
    content,
    image
}) {
    try {
        //创建微博
        const blog = await createBlog({
            userId,
            content: xss(content),
            image
        })
        return new SuccessModel(blog)
    } catch (ex) {
        console.error(ex.message, ex.stack);
        return new ErrorModel(createBlogFailInfo)
    }
}

module.exports = {
    create
}