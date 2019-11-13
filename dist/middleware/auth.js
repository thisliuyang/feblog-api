"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Auth = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _basicAuth = _interopRequireDefault(require("basic-auth"));

class Auth {
  constructor(level) {
    this.level = level || 1;
    Auth.USER = 8;
    Auth.ADMIN = 16;
    Auth.SPUSER_ADMIN = 32;
  }

  get m() {
    // token 检测
    // token 开发者 传递令牌
    // token body header
    // HTTP 规定 身份验证机制 HttpBasicAuth
    return async (ctx, next) => {
      const tokenToken = (0, _basicAuth.default)(ctx.req);
      let errMsg = '无效的token'; // 无带token

      if (!tokenToken || !tokenToken.name) {
        errMsg = '需要携带token值';
        throw new global.errs.Forbidden(errMsg);
      }

      try {
        var decode = _jsonwebtoken.default.verify(tokenToken.name, global.config.security.secretKey);
      } catch (error) {
        // token 不合法 过期
        if (error.name === 'TokenExpiredError') {
          errMsg = 'token已过期';
        }

        throw new global.errs.Forbidden(errMsg);
      }

      if (decode.scope < this.level) {
        errMsg = '权限不足';
        throw new global.errs.Forbidden(errMsg);
      }

      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      };
      await next();
    };
  }

}

exports.Auth = Auth;