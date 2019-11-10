import KoaRouter from 'koa-router'
import controllers from '../../controllers'

const router = new KoaRouter({
  prefix: '/api/v1'
})

router
  .post('/user/category', controllers.category.createCategory)
  .delete('/user/category/:id', controllers.category.destroyCategory)
  .put('/user/category/:id', controllers.category.updateCategory)
  .get('/user/category/:id', controllers.category.getCategory)
  .get('/user/category', controllers.category.getCategoryList)
  .get('/user/category/:id/article', controllers.category.getCategoryArticle)

module.exports = router
