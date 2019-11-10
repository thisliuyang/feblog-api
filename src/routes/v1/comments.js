import KoaRouter from 'koa-router'
import controllers from '../../controllers'

const router = new KoaRouter({
  prefix: '/api/v1'
})

router
  .post('/user/comments', controllers.comments.createComments)
  .delete('/user/comments/:id', controllers.comments.destroyComments)
  .put('/user/comments/:id', controllers.comments.updateComments)
  .get('/user/comments', controllers.comments.getCommentsList)
  .get('/user/comments/:id', controllers.comments.getComments)
  .get('/user/article/:article_id/comments', controllers.comments.getArticleComments)

module.exports = router
