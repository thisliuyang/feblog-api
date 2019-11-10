import KoaRouter from 'koa-router'
import controllers from '../../controllers'

const router = new KoaRouter({
  prefix: '/api/v1'
})

router
  .post('/user/article', controllers.article.addArticle)
  .get('/user/article', controllers.article.getArticleList)
  .get('/user/article/:id', controllers.article.getArticleDetail)
  .get('/user/search/article', controllers.article.getArticleByKeyword)
  .delete('/user/article/:id', controllers.article.deleteArticle)
  .put('/user/article/:id', controllers.article.updateArticle)

module.exports = router
