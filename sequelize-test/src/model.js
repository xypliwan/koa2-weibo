//建立数据模型
const Sequelize = require('sequelize');
const seq = require('./seq');


//创建User 模型
//创建成功后mysql 会自动在user表后加上s,已复数的形式   表名users
const User = seq.define('user', {
    //id 会自动创建，并设为主键，自增
    userName: {
        type: Sequelize.STRING, //对应数据库 varchar(255)  
        allowNull: false, //是否为空 
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    nickName: {
        type: Sequelize.STRING,
        comment: '昵称', //字段说明
    }

    //会自动创建： createdAt 和 updateAt   字段（时间）
})

//创建Blog 模型
const Blog = seq.define('blog', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '标题',
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: '内容',
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '关联users表的id：用户id', //字段说明
    }

    //会自动创建： createdAt 和 updateAt   字段（时间）
})

//外键关联
Blog.belongsTo(User, {
    //创建外键  Blog.userId  => User.id
    foreignKey: 'userId'
})

//另外一种外键方式
User.hasMany(Blog, {
    //创建外键  Blog.userId  => User.id
    foreignKey: 'userId'
})

module.exports = {
    User,
    Blog
}