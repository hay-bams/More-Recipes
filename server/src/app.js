import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import router from './routes';
// This will be our application entry. We'll setup our server here.
import http from 'http';
import config from 'dotenv';
import db from './models/index';

config.config();

// set upthe express app
const app = express();

// log request to the console clear
app.use(logger('dev'));
// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);

db.sequelize.sync().then(() => {
  server.listen(port);
});

