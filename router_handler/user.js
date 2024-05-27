const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// 导入全局配置文件
const config = require('../config')
// 注册
exports.regUser = (req, res) => {
    const userinfo = req.body
    console.log(userinfo)
    // if (!userinfo.username || !userinfo.password) {
    //     return res.send({ status: 400, message: '用户名密码不合法' })
    // }

    const sqlstr = `select * from ev_user where username=?`
    db.query(sqlstr, userinfo.username, (err, result) => {
        if (err) {
            // return res.send({ status: 400, message: err.message })
            return res.cc(err)
        }
        if (result.length > 0) {
            // return res.send({ status: 300, message: '用户名被占用' })
            return res.cc('用户名被占用')
        }
        // 对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)

        const sql = `insert into ev_user set ?`
        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, result) => {
            if (err) {
                return res.cc(err)
            }
            if(result.affectedRows !== 1){
                return res.cc('注册失败请稍后再试')
            }
            res.status(401).send({message: '注册成功'})
        })
    })

}

exports.login = (req, res) => {
    const userinfo = req.body
    console.log(req.body)
    const sql = `select * from ev_user where username=?`

    db.query(sql,userinfo.username,(err,result) => {
        if(err) {
            // 执行sql失败
            return res.cc(err)
        }
        if(result.length !== 1){
          
            return res.cc('请检查用户名')
        }
      const compareResult =  bcrypt.compareSync(userinfo.password,result[0].password)
      if(!compareResult){
        return res.cc('密码错误')
      }
      const user = { ...result[0],password:'',user_pic:''}
      const tokenStr = jwt.sign(user,config.jwtSecretKey,{expiresIn: config.expiresIn})
      res.send({
        status: 500,
        message: '登陆成功',
        token: 'Bearer' + tokenStr,
      })
    })
}