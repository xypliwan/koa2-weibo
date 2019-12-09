const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})


router.get('/json', async (ctx, next) => {
  // const session = ctx.session;;
  // if (session.viewNum == null) {
  //   session.viewNum = 0
  // }
  // session.viewNum++
  ctx.body = {
    title: 'koa2 json',
    // viewNum:session.viewNum
  }
})


router.get('/profile/:userName', async (ctx, next) => {
  const {
    userName
  } = ctx.params; //获取动态参数
  ctx.body = userName
})

//加载更多
router.get('/loadMore/:userName/:pageIndex', async (ctx, next) => {
  const {
    userName,
    pageIndex
  } = ctx.params; //获取动态参数
  ctx.body = `${userName}---${pageIndex}`
})

module.exports = router