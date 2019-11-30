
import { RegisterValidator, AdminLoginValidator } from '../validators/admin'
import { AdminDao } from '../dao/admin'
import { Resolve } from '../lib/helper'
import { LoginManager } from '../services/login'
import qiniu from 'qiniu'
const res = new Resolve()
const ACCESS_KEY = 'DVfjdoiPiZNxFYVmuGe3Yt9kf6RLb-j5XgeuvNib'
const SECRET_KEY = 'wFvpOpoaqcCXOoCU1Je4ikFR-lRBJfa-79gPTDFO'
export const register = async (ctx, next) => {
  // 通过验证器校验参数是否通过
  const v = await new RegisterValidator().validate(ctx)

  // 创建管理员
  await AdminDao.createAdmin(v)

  // 返回结果
  ctx.response.status = 200
  ctx.body = res.success('注册成功')
}

export const login = async (ctx, next) => {
  const v = await new AdminLoginValidator().validate(ctx)

  const token = await LoginManager.adminLogin(v.get('body.email'), v.get('body.password'))

  ctx.response.status = 200
  ctx.body = {
    code: 200,
    msg: '登录成功',
    token
  }
}

export const getUserInfo = async (ctx, next) => {
  // 获取用户ID
  console.log(ctx.state)
  const id = ctx.state.user.uid

  // 查询用户信息
  const userInfo = await AdminDao.getAdminInfo(id)

  // 返回结果
  ctx.response.status = 200
  ctx.body = res.json(userInfo)
}

export const getQiniuToken = (ctx) => {
  const mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY)
  const options = {
    scope: 'feblog',
    expires: 72000
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)
  ctx.response.status = 200
  ctx.body = res.json(uploadToken)
}
