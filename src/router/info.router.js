import express from 'express';
import { getInfo, getInfoCompress } from '../controller/info.controller.js';
import compression from 'compression';
const router = express.Router();

router.get('/info', getInfo);
router.get('/info-compressed',compression(),getInfoCompress)

export default router