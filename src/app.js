
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session');
const redisStore = require('koa-redis')
// const jwtKoa = require('koa-jwt')

const {
  REDIS_CONF
} = require('./conf/db')
const {
  isProd
} = require('./utils/env')

// const {
//   SECRET
// } = require('./conf/constants')

//路由
const index = require('./routes/index')
const userViewRouter = require('./routes/view/user')
const userAPIRouter = require('./routes/api/user')
const errorViewRouter = require('./routes/view/error')

// app.use(jwtKoa({
//   secret: SECRET
// }).unless({
//   path: [/^\/users\/login/] //自定义那些目录忽略  jwt验证
// }))

// error handler
let onerrorConf = {}
if (isProd) {
  onerrorConf = {
    redirect: '/error' //错误重定向
  }
}
onerror(app, onerrorConf)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

//session 配置
app.keys = ['UIsdf_7878#$'];
app.use(session({
  key: 'weibo.sid', //cookie name  默认'koa.sid'
  prefix: 'weibo:sess:', //redis  key的前缀，默认是 'koa:sess:'
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, //1天
  },
  // ttl: 24 * 60 * 60 * 1000, //redis过期时间  默认和cookie保持一致，可以不用写
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))



// routes
app.use(index.routes(), index.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())



// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app