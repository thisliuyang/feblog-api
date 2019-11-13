"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _controllers = _interopRequireDefault(require("../../controllers"));

const router = new _koaRouter.default({
  prefix: '/api/v1'
});
router.post('/user/comments', _controllers.default.comments.createComments).delete('/user/comments/:id', _controllers.default.comments.destroyComments).put('/user/comments/:id', _controllers.default.comments.updateComments).get('/user/comments', _controllers.default.comments.getCommentsList).get('/user/comments/:id', _controllers.default.comments.getComments).get('/user/article/:article_id/comments', _controllers.default.comments.getArticleComments);
module.exports = router;