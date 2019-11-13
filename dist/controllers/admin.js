"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserInfo = exports.login = exports.register = void 0;

var _admin = require("../validators/admin");

var _admin2 = require("../dao/admin");

var _helper = require("../lib/helper");

var _login = require("../services/login");

const res = new _helper.Resolve();

const register = async (ctx, next) => {
  // 通过验证器校验参数是否通过
  const v = await new _admin.RegisterValidator().validate(ctx); // 创建管理员

  await _admin2.AdminDao.createAdmin(v); // 返回结果

  ctx.response.status = 200;
  ctx.body = res.success('注册成功');
};

exports.register = register;

const login = async (ctx, next) => {
  const v = await new _admin.AdminLoginValidator().validate(ctx);
  const token = await _login.LoginManager.adminLogin(v.get('body.email'), v.get('body.password'));
  ctx.response.status = 200;
  ctx.body = {
    code: 200,
    msg: '登录成功',
    token
  };
};

exports.login = login;

const getUserInfo = async (ctx, next) => {
  // 获取用户ID
  console.log(ctx.state);
  const id = ctx.state.user.uid; // 查询用户信息

  const userInfo = await _admin2.AdminDao.getAdminInfo(id); // 返回结果

  ctx.response.status = 200;
  ctx.body = res.json(userInfo);
};

exports.getUserInfo = getUserInfo;