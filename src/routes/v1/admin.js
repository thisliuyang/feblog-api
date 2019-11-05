import KoaRouter from 'koa-router'
import controllers from '../../controllers'
const router = new KoaRouter({
  prefix: '/public/api/v1/admin'
})

export default router
  .post('/register', controllers.admin.register)
  .post('/login', controllers.admin.login)
