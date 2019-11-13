"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _controllers = _interopRequireDefault(require("../../controllers"));

const router = new _koaRouter.default({
  prefix: '/api/v1'
});
router.post('/user/register', _controllers.default.admin.register).post('/user/login', _controllers.default.admin.login).post('/auth', _controllers.default.admin.getUserInfo).get('/user/test', (ctx, next) => {
  ctx.body = {
    code: 9
  };
});
module.exports = router;