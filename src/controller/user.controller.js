import jwt from 'jsonwebtoken'
import { UserModel } from '../models/user.model.js'

export const createUser = async(req,res)=>{
    const {body}=req
    console.log(body)
    const password = jwt.sign({password:body.password},process.env.SECRET_KEY)
    body.password= password
    try {
        const resp = await UserModel.create(body)
        res.json({user:resp})
    } catch (error) {
        console.log(error)
    }
}