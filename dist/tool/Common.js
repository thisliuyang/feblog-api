"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJsonLength = exports.HovercUnique = exports.SqlFormat = exports.OptionFormat = exports.setString = void 0;

var _config = require("../config");

const setString = (str, len) => {
  let StrLen = 0;
  let s = '';

  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 128) {
      StrLen += 2;
    } else {
      StrLen++;
    }

    s += str.charAt(i);

    if (StrLen >= len) {
      return s + '...';
    }
  }

  return s;
}; // 格式化设置


exports.setString = setString;

const OptionFormat = GetOptions => {
  let options = '{';

  for (let n = 0; n < GetOptions.length; n++) {
    options = options + '\'' + GetOptions[n].option_name + '\':\'' + GetOptions[n].option_value + '\'';

    if (n < GetOptions.length - 1) {
      options = options + ',';
    }
  }

  return JSON.parse(options + '}');
}; // 替换SQL字符串中的前缀


exports.OptionFormat = OptionFormat;

const SqlFormat = str => {
  if (_config.SystemConfig.mysql_prefix !== 'api_') {
    str = str.replace(/api_/g, _config.SystemConfig.mysql_prefix);
  }

  return str;
}; // 数组去重


exports.SqlFormat = SqlFormat;

const HovercUnique = arr => {
  const n = {};
  const r = [];

  for (var i = 0; i < arr.length; i++) {
    if (!n[arr[i]]) {
      n[arr[i]] = true;
      r.push(arr[i]);
    }
  }

  return r;
}; // 获取json长度


exports.HovercUnique = HovercUnique;

const getJsonLength = jsonData => {
  var arr = [];

  for (var item in jsonData) {
    arr.push(jsonData[item]);
  }

  return arr.length;
};

exports.getJsonLength = getJsonLength;