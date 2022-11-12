
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExiste, existeUsuarioPorID } = require('../helpers/db-validators');
const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio, minimo 6 caracteres').isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRolValido),
    validarCampos
],usuariosPost );

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarCampos
], usuariosDelete );

router.patch('/', usuariosPatch );



module.exports = router;