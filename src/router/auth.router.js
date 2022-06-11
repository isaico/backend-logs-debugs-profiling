import express from "express";
import { login } from "../controller/auth.controller.js";
const Router = express.Router()

Router.post('/',login)

export default Router