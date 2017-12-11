// This will be our application entry. We'll setup our server here.
import http from 'http';
import app from '../app';
import config from 'dotenv';

config.config(); 

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);