"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _controllers = _interopRequireDefault(require("../controllers"));

const router = new _koaRouter.default();

var _default = router.get('/public/api/v1/courses', _controllers.default.api.GetCourses).all('/upload', _controllers.default.upload).get('/public/api/:name', _controllers.default.api.Get).post('/api/:name', _controllers.default.api.Post).put('/api/:name', _controllers.default.api.Put).del('/api/:name', _controllers.default.api.Delete).post('/auth/:action', _controllers.default.auth.Post).get('/test', (ctx, next) => {
  console.log(ctx.state.user, ctx.state.jwtdata);
  ctx.body = {
    code: 99
  };
});

exports.default = _default;