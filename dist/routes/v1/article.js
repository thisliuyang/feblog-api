"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _controllers = _interopRequireDefault(require("../../controllers"));

const router = new _koaRouter.default({
  prefix: '/api/v1'
});
router.post('/user/article', _controllers.default.article.addArticle).get('/user/article', _controllers.default.article.getArticleList).get('/user/article/:id', _controllers.default.article.getArticleDetail).get('/user/search/article', _controllers.default.article.getArticleByKeyword).delete('/user/article/:id', _controllers.default.article.deleteArticle).put('/user/article/:id', _controllers.default.article.updateArticle);
module.exports = router;