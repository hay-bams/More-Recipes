// This will be our application entry. We'll setup our server here.
import http from 'http';
import config from 'dotenv';
import app from '../app';

require('babel-core/register');
require('babel-polyfill');

config.config();

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
