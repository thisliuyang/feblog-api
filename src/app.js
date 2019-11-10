import Koa2 from 'koa'
import KoaBody from 'koa-body'
import KoaStatic from 'koa-static2'
import { System as SystemConfig } from './config'
import path from 'path'
import MainRoutes from './routes/main-routes'
import ErrorRoutesCatch from './middleware/ErrorRoutesCatch'
import ErrorRoutes from './routes/error-routes'
import jwt from 'koa-jwt'
import cors from '@koa/cors'
import InitManager from './core/init'
import catchError from './middleware/exception'
// import PluginLoader from './lib/PluginLoader'

const app = new Koa2()
app.use(catchError)

const env = process.env.NODE_ENV || 'development' // Current mode

app
  .use(cors())
  .use(ErrorRoutesCatch())
  .use(KoaStatic('assets', path.resolve(__dirname, '../assets'))) // Static resource
  .use(jwt({ secret: 'secretKey' }).unless({ path: [/^\/public|\/test|\/user|\/assets/] }))
  .use(KoaBody({
    multipart: true,
    parsedMethods: ['POST', 'PUT', 'PATCH', 'GET', 'HEAD', 'DELETE'], // parse GET, HEAD, DELETE requests
    formidable: {
      uploadDir: path.join(__dirname, '../assets/uploads/tmp')
    },
    jsonLimit: '10mb',
    formLimit: '10mb',
    textLimit: '10mb'
  })) // Processing request
  // .use(PluginLoader(SystemConfig.System_plugin_path))
  .use(MainRoutes.routes())
  .use(MainRoutes.allowedMethods())
  .use(ErrorRoutes())

InitManager.initCore(app)

if (env === 'development') {
  app.use((ctx, next) => {
    const start = new Date()
    return next().then(() => {
      const ms = new Date() - start
      console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    })
  })
}

app.listen(SystemConfig.API_server_port, () => {
  console.log('Now start API server on port ' + SystemConfig.API_server_port + '...')
})

export default app
