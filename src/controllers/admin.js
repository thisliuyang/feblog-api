
import { RegisterValidator, AdminLoginValidator } from '../validators/admin'
import { AdminDao } from '../dao/admin'
import { Resolve } from '../lib/helper'
import { LoginManager } from '../services/login'

const res = new Resolve()

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
  const id = ctx.auth.uid

  // 查询用户信息
  const userInfo = await AdminDao.getAdminInfo(id)

  // 返回结果
  ctx.response.status = 200
  ctx.body = res.json(userInfo)
}
