"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateToken = exports.findMembers = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

/***
 *
 */
const findMembers = function (instance, {
  prefix,
  specifiedType,
  filter
}) {
  // 递归函数
  function _find(instance) {
    // 基线条件（跳出递归）
    // eslint-disable-next-line no-proto
    if (instance.__proto__ === null) {
      return [];
    }

    let names = Reflect.ownKeys(instance);
    names = names.filter(name => {
      // 过滤掉不满足条件的属性或方法名
      return _shouldKeep(name);
    }); // eslint-disable-next-line no-proto

    return [...names, ..._find(instance.__proto__)];
  }

  function _shouldKeep(value) {
    if (filter) {
      if (filter(value)) {
        return true;
      }
    }

    if (prefix) {
      if (value.startsWith(prefix)) {
        return true;
      }
    }

    if (specifiedType) {
      if (instance[value] instanceof specifiedType) {
        return true;
      }
    }
  }

  return _find(instance);
}; // 颁布令牌


exports.findMembers = findMembers;

const generateToken = function (uid, scope) {
  const secretKey = 'secretKey';
  const expiresIn = 60 * 60;

  const token = _jsonwebtoken.default.sign({
    uid,
    scope
  }, secretKey, {
    expiresIn: expiresIn
  });

  return token;
};

exports.generateToken = generateToken;