"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Comments = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _sequelize = require("sequelize");

var _db = _interopRequireDefault(require("../core/db"));

class Comments extends _sequelize.Model {}

exports.Comments = Comments;
Comments.init({
  id: {
    type: _sequelize.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // 评论人的名字
  nickname: _sequelize.Sequelize.STRING,
  // 评论人的邮箱
  email: _sequelize.Sequelize.STRING,
  // 评论内容
  content: _sequelize.Sequelize.TEXT,
  // 文章ID
  article_id: _sequelize.Sequelize.STRING,
  // 评论父级ID，默认为0
  parent_id: {
    type: _sequelize.Sequelize.INTEGER,
    defaultValue: 0
  },
  created_at: {
    type: _sequelize.Sequelize.DATE,

    get() {
      return (0, _moment.default)(this.getDataValue('created_at')).format('YYYY-MM-DD');
    }

  }
}, {
  sequelize: _db.default,
  tableName: 'comments'
});