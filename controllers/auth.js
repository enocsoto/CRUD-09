const bcryptjs = require("bcryptjs");
const { response } = require("express");
const generarJWT  = require("../helpers/generar-jwt");
const Usuario = require("../models/ususario");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    //verificar si existe el Email
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      res.status(400).json({
        msg: "Usuario / Password no son correctos - correo",
      });
    }

    //verificar si si el usuario está activo
    if (!usuario.estado) {
        res.status(400).json({
          msg: "Usuario / Password no son correctos - estado: false",
        });
      }

    //verificar si existe la constaseña
      const validPassword = bcryptjs.compareSync(password, usuario.password);

      if(!validPassword){
        return res.status(400).json({
            msg: "Usuario / password no son correctos - password"

        })
      }
      //Generar el JWT
      const token = await generarJWT(usuario.id);

    res.json({
     usuario, 
     token
    
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo salio mal, hable con el Admin",
    });
  }
};

module.exports = {
  login,
};
