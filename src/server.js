import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import passport from 'passport';
import UserRouter from './router/user.router.js';
import AuthRouter from './router/auth.router.js';
import RandomRouter from './router/random.router.js';
import InfoRouter from './router/info.router.js';
import './config/db.config.js';
import parseArgs from 'minimist';
import logger from './helpers/logger.js';

dotenv.config();

const args = parseArgs(process.argv.slice(2));
const PORT = args.port;
const MODE = args.mode ? args.mode : 'fork';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(passport.initialize());
/* -------------------------------------------------------------------------- */
/*                                     EJS                                    */
/* -------------------------------------------------------------------------- */

app.set('view engine', 'ejs');
app.set('views', path.resolve('src/views'));
/* -------------------------------------------------------------------------- */
/*                                   ROUTES                                   */
/* -------------------------------------------------------------------------- */

app.use('/user', UserRouter);
app.use('/login', AuthRouter);
app.use('/api', RandomRouter);
app.use('/api', InfoRouter);

/*----rutas indefinidas ---*/
app.use((req, res) => {
  logger.warn('ruta indefinida');
  res.send('ruta indefinida');
});
const server = app.listen(PORT, () => {
  logger.info(
    ` 🚀🔥server is runing at http://localhost:${PORT} 🚀🔥 PID - ${process.pid}`
  );
});

server.on('error', (err) => {
  logger.error(err);
});
