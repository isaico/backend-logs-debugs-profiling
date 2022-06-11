import express from "express";
//import del controller
import { getRandomController } from "../controller/random.controller.js";

const Router = express.Router()

Router.get('/',getRandomController)

export default Router