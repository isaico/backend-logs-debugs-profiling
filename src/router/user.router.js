import express from "express";
const Router = express.Router()
import {createUser} from '../controller/user.controller.js'

Router.post('/',createUser)

export default Router