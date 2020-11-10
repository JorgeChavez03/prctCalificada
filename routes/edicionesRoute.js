/*
Investigadores
ruta: /api/ediciones
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');
const { getEdiciones, crearEdicion, actualizarEdicion, eliminarEdicion } = require('../controllers/edicionesController');

const { validarJWT } = require('../midlewares/validarJWT');


const router = Router();

router.get('/', getEdiciones);


router.post('/', [
        validarJWT,
        check('nombre', 'El nombre de la edicion es obligatorio').not().isEmpty(),
        check('pelicula', 'El id de la pelicula debe ser valido').isMongoId(),
        validarCampos
    ],
    crearEdicion);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre de la edicion es obligatorio').not().isEmpty(),
        check('pelicula', 'El id de la pelicula debe ser valido').isMongoId(),
        validarCampos
    ],
    actualizarEdicion);

router.delete('/:id', validarJWT, eliminarEdicion);



module.exports = router; //para exportar