const { response, request } = require("express");
const Usuario = require("../models/ususario");
const pass = require("bcryptjs");

const usuariosGet = async (req = request, res = response) => {
  //const { q, nombre = "No name", apikey, page = 1, limit } = req.query;
  const { limite = 5, desde = 0 } = req.query;
  const usuariosActivos = { estado: true };

  // const usuarios = await Usuario.find(usuariosActivos)
  // .skip(Number(desde))
  // .limit(Number(limite));

  // const total = await Usuario.countDocuments(usuariosActivos);
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(usuariosActivos),
    Usuario.find(usuariosActivos)
    .skip(Number(desde))
    .limit(Number(limite))
  ]);

  res.json({
    total, usuarios
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, rol, password } = req.body;
  const usuario = new Usuario({ nombre, correo, rol, password });

  //Encriptar Contraseña 10 saltos
  const encrip = pass.genSaltSync();
  usuario.password = pass.hashSync(password, encrip);

  //Guardar BD
  await usuario.save();

  res.json(usuario);
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  //TODO: VALIDAR CONTRA BASE DE DATOS
  if (password) {
    const encrip = pass.genSaltSync();
    resto.password = pass.hashSync(password, encrip);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
   usuario
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usuariosPatch",
  });
};

const usuariosDelete = async (req, res = response) => {
  const {id} = req.params;
 // const uid= req.uid;

    //con este codigo se borra: const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})
   // const usuarioAutenticado= req.usuario;
 

    res.json(usuario);
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete
};
