const express = require('express')

const router = express.Router()

const multer = require('multer')

const path = require('path')

const uploads = multer({dest:path.join(__dirname,'../uploads')})

const article_handler = require('../router_handler/article')

const { add_article_schema } = require('../schema/article')
const expressJoi = require('@escook/express-joi')

router.post('/add',uploads.single('cover_img'),expressJoi(add_article_schema),article_handler.addArticle)

module.exports = router