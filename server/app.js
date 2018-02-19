import express from 'express';
import cors from 'cors';
import path from 'path';
import config from 'dotenv';
import logger from 'morgan';
import bodyParser from 'body-parser';
import router from './routes';

config.config();

// set upthe express app
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(express.static(path.join(__dirname, '/public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());

// log request to the console clear
app.use(logger('dev'));
// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

export default app;
