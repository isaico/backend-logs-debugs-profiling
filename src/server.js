import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { auth } from './midlewares/auth.midleware.js';
import passport from 'passport';
import UserRouter from './router/user.router.js';
import AuthRouter from './router/auth.router.js';
// import getRandomController from './router/random.router.js';
import './config/db.config.js';
import parseArgs from 'minimist';
import { fork } from 'child_process';
import cluster from 'cluster';
import os from 'os';
import logger from './helpers/logger.js';
import compression from 'compression';

dotenv.config();
const calc = fork('./src/helpers/random_sinBloqueo.js');
const args = parseArgs(process.argv.slice(2));
const PORT = args.port;
const MODE = args.mode ? args.mode : 'fork';
const numCpus = os.cpus().length;
const app = express();

// if (cluster.isMaster) {
//   console.log(`🔥Primary ${process.pid} is running 😇`);
//   for (let i = 0; i < numCpus; i++) {
//     cluster.fork();
//   }
//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`worker died ${worker.process.pid}`);
//     cluster.fork();
//   });
// } else {
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
  // app.use('/api/randoms?', getRandomController);//aca funciona con la forma bloqueante y modularizado

  app.get('/api/randoms?', (req, res) => {
    const { cant } = req.query;
    calc.on('message', (resultado) => {
      console.log('resultado:', resultado);
      res.status(200).json(resultado);
    });
    if (cant) {
      const stringCantidad = cant.toString();
      calc.send(stringCantidad);
    } else {
      calc.send('10000000');
    }
  });
  app.get('/info',  (req, res) => {
    const obj = {
      Argumentos: args,
      SO: process.platform,
      NodeV: process.version,
      Rss: process.memoryUsage(),
      PathEjecucion: process.execPath,
      ProcessId: process.pid,
      CarpetaProyecto: process.cwd(),
      procesadores: numCpus,
    };
    // console.log(obj)
    logger.info({ ruta: '/info', metodo: 'GET' });
    res.status(200).json({ obj });
  });
  app.get('/infoComp', compression(), (req, res) => {
    const obj = {
      Argumentos: args,
      SO: process.platform,
      NodeV: process.version,
      Rss: process.memoryUsage(),
      PathEjecucion: process.execPath,
      ProcessId: process.pid,
      CarpetaProyecto: process.cwd(),
      procesadores: numCpus,
    };
    console.log(obj)
    logger.info({ ruta: '/infoComp', metodo: 'GET' });
    res.status(200).json({ obj });
  });

  app.get('/', (req, res) => {
    console.log(`😇 PID: ${process.pid}`);
    logger.info({ ruta: '/', metodo: 'GET' });
    res.send(`😇Puerto:  ${PORT}  PID: ${process.pid}`);
    // res.render('input');
  });

  app.get('/register', (req, res) => {
    logger.info({ ruta: '/register', metodo: 'GET' });
    res.render('register');
  });

  app.get('/inicio', auth, (req, res) => {
    const { user } = req.user;
    logger.info({ ruta: '/inicio', metodo: 'GET' });
    res.render('index', { user: user.userName });
  });
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
// }
