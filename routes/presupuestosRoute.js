/*
Investigadores
ruta: /api/presupuestos
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');
const { getPresupuestos, crearPresupuesto, actualizarPresupuesto, eliminarPresupuesto } = require('../controllers/presupuestosController');

const { validarJWT } = require('../midlewares/validarJWT');


const router = Router();

router.get('/', getPresupuestos);


router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del presupuesto es obligatorio').not().isEmpty(),
        check('pelicula', 'El id de la pelicula debe ser valido').isMongoId(),
        check('edicion', 'El id de la edicion debe ser valido').isMongoId(),
        validarCampos
    ],
    crearPresupuesto);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del presupuesto es obligatorio').not().isEmpty(),
        check('pelicula', 'El id de la pelicula debe ser valido').isMongoId(),
        check('edicion', 'El id de la edicion debe ser valido').isMongoId(),
        validarCampos
    ],
    actualizarPresupuesto);

router.delete('/:id', validarJWT, eliminarPresupuesto);



module.exports = router; //para exportar