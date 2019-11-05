import { AdminDao } from '../dao/admin'
import { generateToken } from '../core/util'
import { Auth } from '../middleware/auth'

class LoginManager {
  // 管理员登录
  static async adminLogin (email, password) {
    // 验证账号密码是否正确
    const admin = await AdminDao.verifyEmailPassword(email, password)
    return generateToken(admin.id, Auth.ADMIN)
  }
}
export {
  LoginManager
}
