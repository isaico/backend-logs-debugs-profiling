import express from "express";
import { getRandomAsyncController } from "../controller/random.controller.js";

const Router = express.Router()

Router.get('/randoms?',getRandomAsyncController)

export default Router