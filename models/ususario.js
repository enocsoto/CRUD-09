const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
    trim: true,
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es pbligatoria"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    emun: ["ADMIN_ROLE", "USER_ROLE", "VENTAS_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UsuarioSchema.methods.toJSON = function(){
const {__v,_id, password, ...user} = this.toObject();
user.uid= _id;
return user;
}

module.exports = model("Usuario", UsuarioSchema);
