import Router from 'koa-router'
import requireDirectory from 'require-directory'

class InitManager {
  static initCore (app) {
    // 入口方法
    InitManager.app = app
    InitManager.initLoadRouters()
    InitManager.loadHttpException()
    // InitManager.loadConfig()
  }

  // 加载全部路由
  static initLoadRouters () {
    // 绝对路径
    const apiDirectory = process.env.NODE_ENV === 'development' ? `${process.cwd()}/src/routes/v1` : `${process.cwd()}/dist/routes/v1`
    // 路由自动加载
    requireDirectory(module, apiDirectory, {
      visit: route => {
        if (route instanceof Router) {
          InitManager.app.use(route.routes())
        }
      }
    })
  }

  static loadConfig (path = '') {
    const configPath = path || process.cwd() + '/config/config.js'
    const config = require(configPath)
    global.config = config
  }

  static loadHttpException () {
    const errors = require('./http-exception')
    global.errs = errors
  }
}

export default InitManager
