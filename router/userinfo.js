const express = require('express')

const router = express.Router()
const expressJoi = require('@escook/express-joi')
const userinfo_handler = require('../router_handler/userinfo')
const { updated_userinfo_schema,update_password_schema,update_avatar_schema } = require('../schema/user')

router.get('/userinfo',userinfo_handler.getUserInfo)
router.post('/userinfo',expressJoi(updated_userinfo_schema),userinfo_handler.updatedUserInfo)
router.post('/updatePwd',expressJoi(update_password_schema),userinfo_handler.updatePassword)
router.post('/update/avatar',expressJoi(update_avatar_schema),userinfo_handler.updateAvatar)

module.exports = router