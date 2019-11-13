"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginManager = void 0;

var _admin = require("../dao/admin");

var _util = require("../core/util");

var _auth = require("../middleware/auth");

class LoginManager {
  // 管理员登录
  static async adminLogin(email, password) {
    // 验证账号密码是否正确
    const admin = await _admin.AdminDao.verifyEmailPassword(email, password);
    return (0, _util.generateToken)(admin.id, _auth.Auth.ADMIN);
  }

}

exports.LoginManager = LoginManager;