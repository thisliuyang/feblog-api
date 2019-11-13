"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koa = _interopRequireDefault(require("koa"));

var _koaBody = _interopRequireDefault(require("koa-body"));

var _koaStatic = _interopRequireDefault(require("koa-static2"));

var _config = require("./config");

var _path = _interopRequireDefault(require("path"));

var _mainRoutes = _interopRequireDefault(require("./routes/main-routes"));

var _ErrorRoutesCatch = _interopRequireDefault(require("./middleware/ErrorRoutesCatch"));

var _errorRoutes = _interopRequireDefault(require("./routes/error-routes"));

var _koaJwt = _interopRequireDefault(require("koa-jwt"));

var _cors = _interopRequireDefault(require("@koa/cors"));

var _init = _interopRequireDefault(require("./core/init"));

var _exception = _interopRequireDefault(require("./middleware/exception"));

// import PluginLoader from './lib/PluginLoader'
const app = new _koa.default();
app.use(_exception.default);
const env = process.env.NODE_ENV || 'development'; // Current mode

app.use((0, _cors.default)()).use((0, _ErrorRoutesCatch.default)()).use((0, _koaStatic.default)('assets', _path.default.resolve(__dirname, '../assets'))) // Static resource
.use((0, _koaJwt.default)({
  secret: 'secretKey'
}).unless({
  path: [/^\/public|\/test|\/user|\/assets/]
})).use((0, _koaBody.default)({
  multipart: true,
  parsedMethods: ['POST', 'PUT', 'PATCH', 'GET', 'HEAD', 'DELETE'],
  // parse GET, HEAD, DELETE requests
  formidable: {
    uploadDir: _path.default.join(__dirname, '../assets/uploads/tmp')
  },
  jsonLimit: '10mb',
  formLimit: '10mb',
  textLimit: '10mb'
})) // Processing request
// .use(PluginLoader(SystemConfig.System_plugin_path))
.use(_mainRoutes.default.routes()).use(_mainRoutes.default.allowedMethods()).use((0, _errorRoutes.default)());

_init.default.initCore(app);

if (env === 'development') {
  app.use((ctx, next) => {
    const start = new Date();
    return next().then(() => {
      const ms = new Date() - start;
      console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });
  });
}

app.listen(_config.System.API_server_port, () => {
  console.log('Now start API server on port ' + _config.System.API_server_port + '...');
});
var _default = app;
exports.default = _default;