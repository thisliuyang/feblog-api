"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Category = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _db = _interopRequireDefault(require("../core/db"));

var _sequelize = require("sequelize");

class Category extends _sequelize.Model {} // 初始分类模型


exports.Category = Category;
Category.init({
  id: {
    type: _sequelize.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // 分类名
  name: _sequelize.Sequelize.STRING,
  // 分类键
  key: _sequelize.Sequelize.STRING,
  // 分类父级ID，默认为0
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
  tableName: 'category'
});