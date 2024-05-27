const db = require('../db/index')
const bcrypt = require('bcryptjs')

exports.getUserInfo = (req, res) => {
    const sql = `select id, username, nickname, email, user_pic from ev_user where id=?`

    db.query(sql, req.user.id, (err, result) => {
        if (err) return res.cc(err)
        if (result.length !== 1) return res.cc('获取用户信息失败')

        res.send({
            status: 0,
            message: '获取信息成功',
            data: result[0],
        })
    })

}

exports.updatedUserInfo = (req, res) => {
    const sql = `update ev_user set ? where id=?`

    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('修改基本信息失败')
        console.log(req.body)
        return res.cc('修改成功', 0)
    })
}

exports.updatePassword = (req, res) => {
    const sql = `select * from ev_user where id=?`

    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)

        if (results.length !== 1) return res.cc('用户不存在')

        // 判断密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) return res.cc('旧密码错误')

        const sql = `update ev_user set password=? where id=?`
        const newPwd = bcrypt.hashSync(req.body.newPwd,10)
        db.query(sql,[newPwd,req.user.id],(err,results) => {
            if(err) res.cc(err)
            if(results.affectedRows !== 1) return res.cc('更新密码失败')
            res.cc('更新成功',0)
        })
    })

}

exports.updateAvatar = (req,res) => {
    const sql = `update ev_user set user_pic=? where id=?`

    db.query(sql,[req.body.avatar,req.user.id],(err,results) => {
        if(err) return res.cc
        if(results.affectedRows !== 1) return res.cc('更新头像失败')
        
        return res.cc('更新成功',0)
    })
    
}