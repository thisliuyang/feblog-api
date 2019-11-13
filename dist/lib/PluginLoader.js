"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _koaCompose = _interopRequireDefault(require("koa-compose"));

function getDirs(srcpath) {
  return _fs.default.readdirSync(srcpath).filter(file => {
    return _fs.default.statSync(_path.default.join(srcpath, file)).isDirectory();
  });
}

module.exports = (srcpath, filename = 'index.js') => {
  const plugins = {};
  const dirs = getDirs(srcpath);
  const list = [];

  for (const name of dirs) {
    let fn = require(_path.default.join(srcpath, name, filename));

    if (typeof fn !== 'function' && typeof fn.default === 'function') {
      fn = fn.default;
    } else {
      throw new Error('plugin must be a function!');
    }

    plugins[name] = fn;
    list.push(function (ctx, next) {
      return fn(ctx, next) || next();
    });
  }

  return (0, _koaCompose.default)(list);
};