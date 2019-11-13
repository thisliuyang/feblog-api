"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _controllers = _interopRequireDefault(require("../../controllers"));

const router = new _koaRouter.default({
  prefix: '/api/v1'
});
router.post('/user/category', _controllers.default.category.createCategory).delete('/user/category/:id', _controllers.default.category.destroyCategory).put('/user/category/:id', _controllers.default.category.updateCategory).get('/user/category/:id', _controllers.default.category.getCategory).get('/user/category', _controllers.default.category.getCategoryList).get('/user/category/:id/article', _controllers.default.category.getCategoryArticle);
module.exports = router;