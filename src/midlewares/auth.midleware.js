import jwt from 'jsonwebtoken'

export const auth = async (req,res,next)=>{
    try {
        const token = req.header('Authorization')
        console.log(token)
        if(!token) res.send("acceso denegado, token no recibido")
       
        jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
            if(err){
                res.send("acceso denegado , token expirado o incorrecto")
            }
            req.user = user
        })
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send(error)
    }
}