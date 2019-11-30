import KoaRouter from 'koa-router'
import controllers from '../../controllers'

const router = new KoaRouter({
  prefix: '/api/v1'
})

router
  .post('/user/register', controllers.admin.register)
  .post('/user/login', controllers.admin.login)
  .post('/auth', controllers.admin.getUserInfo)
  .get('/user/qiniutoken', controllers.admin.getQiniuToken)
  .get('/user/test', (ctx, next) => {
    ctx.body = {
      code: 'test'
    }
  })

module.exports = router
