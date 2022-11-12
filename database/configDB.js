const mongoose = require('mongoose')

const dbConnection = async()=>{
try {
   await mongoose.connect(process.env.MONGODB_CNN)
   console.log('Base de datos Online');

} catch (err) {
    console.log(err);
    throw new Error('Error al iniciar la BD')
}


} 
module.exports={

    dbConnection
}