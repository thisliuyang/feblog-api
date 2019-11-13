"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Article = void 0;

var _db = _interopRequireDefault(require("../core/db"));

var _moment = _interopRequireDefault(require("moment"));

var _sequelize = require("sequelize");

class Article extends _sequelize.Model {} // 初始文章模型


exports.Article = Article;
Article.init({
  id: {
    type: _sequelize.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // 文章标题
  title: _sequelize.Sequelize.STRING,
  // 文章作者
  author: _sequelize.Sequelize.STRING(64),
  // 文章内容
  content: _sequelize.Sequelize.TEXT,
  // 文章封面
  cover: _sequelize.Sequelize.STRING,
  // 文章分类ID
  category_id: _sequelize.Sequelize.STRING,
  // 文章浏览次数
  browse: {
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
  tableName: 'article'
});