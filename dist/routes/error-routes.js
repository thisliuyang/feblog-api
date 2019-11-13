"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  return function (ctx, next) {
    switch (ctx.status) {
      case 404:
        ctx.body = '没有找到内容 - 404';
        break;
    }

    return next();
  };
}