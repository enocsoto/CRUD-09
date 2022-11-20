const validarCampos = require('../middlewares/validar-campos');
const validarjwt = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');


module.exports={
    ...validaRoles, 
    ...validarCampos,
    ...validarjwt
}