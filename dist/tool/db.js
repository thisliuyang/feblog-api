"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _promiseMysql = _interopRequireDefault(require("promise-mysql"));

var _config = require("../config");

const pool = _promiseMysql.default.createPool(_config.DB);

var _default = pool;
exports.default = _default;