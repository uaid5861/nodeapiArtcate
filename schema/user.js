const Joi = require('joi')
const expressJoi = require('@escook/express-joi')

// 验证规则
// const userSchema = {
//     body: {
//         username: Joi.string().alphanum().min(3).max(12).required(),
//         password: Joi.string().pattern(/^[\S]{2,15}$/),
//         repassword: Joi.ref('password')
//     },
//     query: {
//         name: Joi.string().alphanum().min(1).required(),
//         age: Joi.number().integer().min(1).max(999).required()
//     },
//     params: {
//         id: Joi.number().integer().min(0).required()
//     }
// }

const username = Joi.string().alphanum().min(1).max(12).required()
const password = Joi.string().pattern(/^[\S]{2,15}$/).required()
const id = Joi.number().integer().min(1).required()
const nickname = Joi.string().required()
const user_email = Joi.string().email()
const avatar = Joi.string().dataUri().required()

// 验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
    body: {
        username,
        password
    }
}
// 更新信息表单验证
exports.updated_userinfo_schema = {
    body: {
        id,
        nickname,
        email: user_email
    }
}
// 重置密码验证
exports.update_password_schema = {
    body: {
        oldPwd: password,
        newPwd: Joi.not(Joi.ref('oldPwd')).concat(password)
    }
}
// 验证头像
exports.update_avatar_schema = {
    body: {
        avatar
    }
}