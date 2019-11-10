import KoaRouter from 'koa-router'
import controllers from '../controllers'
const router = new KoaRouter()

export default router
  .get('/public/api/v1/courses', controllers.api.GetCourses)
  .all('/upload', controllers.upload)
  .get('/public/api/:name', controllers.api.Get)
  .post('/api/:name', controllers.api.Post)
  .put('/api/:name', controllers.api.Put)
  .del('/api/:name', controllers.api.Delete)
  .post('/auth/:action', controllers.auth.Post)
  .get('/test', (ctx, next) => {
    console.log(ctx.state.user, ctx.state.jwtdata)
    ctx.body = {
      code: 99
    }
  })
