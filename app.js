const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const Joi = require('joi')


// 路由之前封装res.cc
app.use((req,res,next) => {
    // status默认为1，表示失败
    res.cc = function(err,status = 1){
        res.send({
            status,
            message:err instanceof Error ? err.message : err,
        })
    }
    next()
})
// 配置解析token中间件
const expressJWT = require('express-jwt')
const config = require('./config')

app.use(expressJWT({ secret: config.jwtSecretKey}).unless({ path: [/^\/api/] }))

const userRouter = require('./router/user')
const userInfoRouter = require('./router/userinfo')
const artCateRouter = require('./router/artcate')
const articleRouter = require('./router/article')


app.use(cors())
app.use('/uploads',express.static('./uploads'))
app.use(express.urlencoded({extended:false}))
app.use('/api',userRouter)
app.use('/my',userInfoRouter)
app.use('/my/article',artCateRouter)
app.use('/my/article',articleRouter)
// app.get('/', (req, res) => res.send('Hello World!'))
// 错误中间件
app.use(function(err,req,res,next){
    if(err instanceof Joi.ValidationError) return res.cc(err)
    // 身份认证失败
    if(err.name === 'UnauthorizedError') return res.cc('身份认证失败')
    // 未知错误
    res.cc(err)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))