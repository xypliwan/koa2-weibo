//查询
const {
    Blog,
    User
} = require('./model');

!(async () => {
    //findOne查一条数据   查询所有的列
    const zhangsan = await User.findOne({
        where: {
            userName: 'zhangsan'
        }
    })
    // console.log('zhangsan',zhangsan.dataValues)

    //查询特定的列  userName   nickName
    const zhangsanName = await User.findOne({
        attributes: ['userName', 'nickName'],
        where: {
            userName: 'zhangsan'
        }
    })
    // console.log('zhangsanName', zhangsanName.dataValues)


    //根据用户id查询一个列表  
    const zhangsanBlogList = await Blog.findAll({
        where: {
            userId: 1
        },
        order: [ //排序  
            ['id', 'desc'] //根据id倒序  查询
            // ['time','desc']       //根据时间倒序  查询
        ]
    })
    // console.log('zhangsanBlogList', zhangsanBlogList.map(blog => blog.dataValues))      //返回数组


    //分页
    const blogPageList = await Blog.findAll({
        limit: 2, //限制查询每次2条
        offset: 2, //跳过多少条  （第几页）
        order: [
            ['id', 'desc']
        ]
    })
    // console.log('blogPageList', blogPageList.map(blog => blog.dataValues)) //返回数组


    //查询总数
    const blogListAndCount = await Blog.findAndCountAll({
        limit: 2, //限制查询每次2条
        offset: 0, //跳过多少条  （第几页）
        order: [
            ['id', 'desc']
        ]
    })
    // console.log(
    //     'blogListAndCount',
    //     blogListAndCount.count, //所有的总数，不考虑分页
    //     blogListAndCount.rows.map(blog => blog.dataValues) //
    // )


    //连表查询1

    //争对这种外键关系
    // Blog.belongsTo(User, {
    //     //创建外键  Blog.userId  => User.id
    //     foreignKey: 'userId'
    // })
    //查询blog表时，顺便吧user也查询出来
    const blogListWithUser = await Blog.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        include: [{
                model: User, //查询User表
                attributes: ['userName', 'nickName'], //只要这两个字段查询出来
                where: {
                    userName: 'zhangsan' //条件:只查userName = 'zhangsan' 的
                }
            },
            // {}       //查询其他表
        ]
    })

    // console.log(
    //     'blogListWithUser',
    //     blogListWithUser.count,
    //     blogListWithUser.rows.map(blog => {
    //         const blogVal = blog.dataValues //blog表查询的数据
    //         blogVal.user = blogVal.user.dataValues //user表查询的信息
    //         return blogVal;
    //     })
    // )

    // ==========================
    //连表查询2
    //争对这种外键关系   与上面相反
    // User.hasMany(Blog, {
    //     //创建外键  Blog.userId  => User.id
    //     foreignKey: 'userId'
    // })

    const userListWithBlog = await User.findAndCountAll({
        attributes: ['userName', 'nickName'],
        include: [{
            model: Blog //查询所有的
        }]
    })
    console.log(
        'userListWithBlog',
        userListWithBlog.count,
        userListWithBlog.rows.map(user => {
            const userVal = user.dataValues //blog表查询的数据
            userVal.blogs = userVal.blogs.map(blog => blog.dataValues) //user表查询的信息
            return userVal;
        })
    )




})()