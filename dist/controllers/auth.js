"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Post = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

const publicKey = _fs.default.readFileSync(_path.default.join(__dirname, '../../publicKey.pub')); // 用户登录的时候返回token
// let token = jwt.sign({
//   userInfo: userInfo // 你要保存到token的数据
// }, publicKey, { expiresIn: '7d' })

/**
 * 检查授权是否合法
 */


const CheckAuth = (ctx, next) => {
  const token = ctx.request.header.authorization;

  try {
    const decoded = _jsonwebtoken.default.verify(token.substr(7), publicKey);

    if (decoded.userInfo) {
      return {
        status: 1,
        result: decoded.userInfo
      };
    } else {
      return {
        status: 403,
        result: {
          errInfo: '没有授权'
        }
      };
    }
  } catch (err) {
    return {
      status: 503,
      result: {
        errInfo: '解密错误'
      }
    };
  }
};

const Post = (ctx, next) => {
  switch (ctx.params.action) {
    case 'check':
      return CheckAuth(ctx).then(result => {
        ctx.body = result;
        next();
      });

    default:
      return CheckAuth(ctx).then(result => {
        ctx.body = result;
        next();
      });
  }
};

exports.Post = Post;