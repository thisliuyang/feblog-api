"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _upload = _interopRequireDefault(require("./upload"));

var api = _interopRequireWildcard(require("./api"));

var auth = _interopRequireWildcard(require("./auth"));

var admin = _interopRequireWildcard(require("./admin"));

var article = _interopRequireWildcard(require("./article"));

var category = _interopRequireWildcard(require("./category"));

var comments = _interopRequireWildcard(require("./comments"));

var _default = {
  upload: _upload.default,
  api,
  auth,
  admin,
  article,
  category,
  comments
};
exports.default = _default;