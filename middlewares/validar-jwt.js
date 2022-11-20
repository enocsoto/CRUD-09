const { response, request } = require("express");
const Usuario = require('../models/ususario');
const jwt = require("jsonwebtoken");
const validarjwt = async (req = request, res = response, next) => {
  const token = req.header('x-token');
  
  if( !token){
    return res.status(401).json({
        msg: 'No hay token en la peticion'
    })
  }

  try {


    const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
   
    //leer el usuario que corresponde al uid
    const usuario = await Usuario.findById(uid);

    if(!usuario){

      return res.status(401).json({
        msg: 'Token no valido - Usuario no existe en DB'
      })
    }
    
    //verificar si el uid tiene estado true
    if(!usuario.estado){
      return res.status(401).json({
        msg: 'Token no valido - USUARIO CON ESTADO FALSE'
      })
    }
    
    req.usuario =usuario;

    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({
        msg: 'Token no valido'
    })
}
  
  
  console.log(token);
  next();

};

module.exports = {
  validarjwt,
};
