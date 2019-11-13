"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Delete = exports.Put = exports.Post = exports.GetCourses = exports.Get = void 0;

var _db = _interopRequireDefault(require("../tool/db"));

var _moment = _interopRequireDefault(require("moment"));

const Get = async (ctx, next) => {
  ctx.body = {
    code: 0
  };
};

exports.Get = Get;

const GetCourses = async (ctx, next) => {
  const pool = await _db.default;
  const res = await pool.query('SELECT * FROM ningmeng.course WHERE DATE_SUB(CURDATE(), INTERVAL 7 DAY) < start_time;');

  for (const i of res) {
    i.startTime = (0, _moment.default)(i.start_time).format('YYYY-MM-DD HH:mm');
  }

  const sort = res.sort((a, b) => {
    if (a.startTime < b.startTime) {
      return -1;
    }

    if (a.startTime > b.startTime) {
      return 1;
    }

    return 0;
  });
  const now = (0, _moment.default)().format('YYYY-MM-DD HH:mm');
  ctx.body = {
    code: 0,
    data: {
      hasBaby: true,
      initDate: '',
      weekCourses: [now, sort]
    },
    msg: 'ok'
  };
};

exports.GetCourses = GetCourses;

const Post = async (ctx, next) => {
  ctx.body = {
    result: 'post',
    name: ctx.params.name,
    para: ctx.request.body
  };
  next();
};

exports.Post = Post;

const Put = (ctx, next) => {
  ctx.body = {
    result: 'put',
    name: ctx.params.name,
    para: ctx.request.body
  };
  next();
};

exports.Put = Put;

const Delete = (ctx, next) => {
  ctx.body = {
    result: 'delete',
    name: ctx.params.name,
    para: ctx.request.body
  };
  next();
};

exports.Delete = Delete;