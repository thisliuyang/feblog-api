"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Admin = void 0;

var _db = _interopRequireDefault(require("../core/db"));

var _moment = _interopRequireDefault(require("moment"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _sequelize = require("sequelize");

// const { sequelize } = require('../lib/sequelize.js')
class Admin extends _sequelize.Model {} // 初始用户模型


exports.Admin = Admin;
Admin.init({
  id: {
    type: _sequelize.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // 管理员昵称
  nickname: _sequelize.Sequelize.STRING,
  // 管理员邮箱
  email: {
    type: _sequelize.Sequelize.STRING(128),
    unique: true
  },
  // 管理员密码
  password: {
    type: _sequelize.Sequelize.STRING,

    set(val) {
      // 加密
      const salt = _bcryptjs.default.genSaltSync(10); // 生成加密密码


      const psw = _bcryptjs.default.hashSync(val, salt);

      this.setDataValue('password', psw);
    }

  },
  created_at: {
    type: _sequelize.Sequelize.DATE,

    get() {
      return (0, _moment.default)(this.getDataValue('created_at')).format('YYYY-MM-DD');
    }

  }
}, {
  sequelize: _db.default,
  tableName: 'admin'
});