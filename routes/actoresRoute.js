/*
Actores
ruta: /api/actores
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');
const { getActores, crearActor, actualizarActor, eliminarActor } = require('../controllers/actoresController');
const { validarJWT } = require('../midlewares/validarJWT');


const router = Router();

router.get('/', getActores);


router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del actor es obligatorio').not().isEmpty(),
        check('pelicula', 'El id de la pelicula debe ser valido').isMongoId(),
        validarCampos
    ],
    crearActor);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del actor es obligatorio').not().isEmpty(),
        check('pelicula', 'El id de la pelicula debe ser valido').isMongoId(),
        validarCampos
    ],
    actualizarActor);

router.delete('/:id', validarJWT, eliminarActor);



module.exports = router; //para exportar