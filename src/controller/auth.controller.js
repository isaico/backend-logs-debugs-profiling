import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model.js';

export const login = async (req, res) => {
  const { body } = req;
  try {
    const user = await UserModel.findOne({ userName: body.userName });
   
    if (!user) {
      res.render("failLogin",{error:"usuario no encontrado en la base de datos"}) //aca va fail login
    }
    const password = jwt.verify(user.password, process.env.SECRET_KEY).password;
    if (body.password === password) {
      
      const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: "10m" });
      // res.header('Authorization',token).json({
      //   message:"usuario autenticado",
      //   token:token
      // })
      res.json({token:token})
     
    } else {
      res.render('failLogin',{error:' clave incorrecta!'});
    }
  } catch (error) {
    console.log(error);
  }
};
