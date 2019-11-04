import KoaRouter from 'koa-router'
import controllers from '../controllers'
const {
  RegisterValidator
} = require('../validators/admin')
const { AdminDao } = require('../dao/admin')
const { Resolve } = require('../lib/helper')
const res = new Resolve()
const router = new KoaRouter()

export default router
  .get('/public/api/v1/courses', controllers.api.GetCourses)
  .post('/public/register', async (ctx) => {
    // 通过验证器校验参数是否通过
    const v = await new RegisterValidator().validate(ctx)

    // 创建管理员
    await AdminDao.createAdmin(v)

    // 返回结果
    ctx.response.status = 200
    ctx.body = res.success('注册成功')
  })

  .all('/upload', controllers.upload)
  .get('/public/api/:name', controllers.api.Get)
  .post('/api/:name', controllers.api.Post)
  .put('/api/:name', controllers.api.Put)
  .del('/api/:name', controllers.api.Delete)
  .post('/auth/:action', controllers.auth.Post)
