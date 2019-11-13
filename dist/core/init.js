"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _requireDirectory = _interopRequireDefault(require("require-directory"));

class InitManager {
  static initCore(app) {
    // 入口方法
    InitManager.app = app;
    InitManager.initLoadRouters();
    InitManager.loadHttpException(); // InitManager.loadConfig()
  } // 加载全部路由


  static initLoadRouters() {
    // 绝对路径
    const apiDirectory = `${process.cwd()}/dist/routes/v1`; // 路由自动加载

    (0, _requireDirectory.default)(module, apiDirectory, {
      visit: route => {
        if (route instanceof _koaRouter.default) {
          InitManager.app.use(route.routes());
        }
      }
    });
  }

  static loadConfig(path = '') {
    const configPath = path || process.cwd() + '/config/config.js';

    const config = require(configPath);

    global.config = config;
  }

  static loadHttpException() {
    const errors = require('./http-exception');

    global.errs = errors;
  }

}

var _default = InitManager;
exports.default = _default;