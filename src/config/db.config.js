import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
mongoose.connect(process.env.MONGO_URI, (err) => {
    if (err) {
      console.log("Error de coneccion de db" );
    } else {
      console.log("🚀 Conectado con exito a MongoDB 🚀");
    }
  });