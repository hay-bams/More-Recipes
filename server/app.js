import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';
import router from './routes';

require('babel-core/register');
require('babel-polyfill');

// set upthe express app
const app = express();

app.use(cors());

// log request to the console clear
app.use(logger('dev'));
// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

export default app;
