'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

require('babel-polyfill');

var _babelCore = require('babel-core');

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config(); // This will be our application entry. We'll setup our server here.


var port = parseInt(process.env.PORT, 10) || 8000;
_app2.default.set('port', port);

var server = _http2.default.createServer(_app2.default);
server.listen(port);