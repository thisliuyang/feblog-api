import KoaRouter from 'koa-router'
import controllers from '../../controllers'
import { Auth } from '../../middleware/auth'
const router = new KoaRouter({
  prefix: '/public/api/v1/admin'
})
const AUTH_ADMIN = 16

router
  .post('/register', controllers.admin.register)
  .post('/login', controllers.admin.login)
  .post('/auth', new Auth(AUTH_ADMIN).m, controllers.admin.getUserInfo)

module.exports = router
