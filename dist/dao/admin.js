"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminDao = void 0;

var _admin = require("../models/admin");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

// data access object
class AdminDao {
  // 创建用管理员
  static async createAdmin(v) {
    const hasAdmin = await _admin.Admin.findOne({
      where: {
        email: v.get('body.email'),
        deleted_at: null
      }
    });

    if (hasAdmin) {
      throw new global.errs.Existing('管理员已存在');
    }

    const admin = new _admin.Admin();
    admin.email = v.get('body.email');
    admin.password = v.get('body.password2');
    admin.nickname = v.get('body.nickname');
    admin.save();
  } // 验证密码


  static async verifyEmailPassword(email, plainPassword) {
    // 查询用户是否存在
    const admin = await _admin.Admin.findOne({
      where: {
        email
      }
    });

    if (!admin) {
      throw new global.errs.AuthFailed('账号不存在');
    } // 验证密码是否正确


    const correct = _bcryptjs.default.compareSync(plainPassword, admin.password);

    if (!correct) {
      throw new global.errs.AuthFailed('密码不正确');
    }

    return admin;
  } // 查询管理员信息


  static async getAdminInfo(id) {
    const scope = 'bh'; // 查询管理员是否存在

    const admin = await _admin.Admin.scope(scope).findOne({
      where: {
        id
      }
    });

    if (!admin) {
      throw new global.errs.AuthFailed('账号不存在');
    }

    return admin;
  }

}

exports.AdminDao = AdminDao;