const { response } = require('express');
const Presupuesto = require('../models/presupuestoModel');

const getPresupuestos = async(req, res = response) => {
    const presupuestos = await Edicion.find().
    populate('usuario', 'nombre img').
    populate('pelicula', 'nombre img').
    populate('edicion', 'nombre img');

    res.json({
        ok: true,
        presupuestos
    });
}
const crearPresupuesto = async(req, res = response) => {
    const uid = req.uid;

    const presupuesto = new Presupuesto({
        usuario: uid,
        ...req.body
    });

    try {

        const presupuestoDB = await actor.save();
        res.json({
            ok: true,
            presupuesto: presupuestoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }
}
const actualizarPresupuesto = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const presupuesto = await Presupuesto.findById(id);
        if (!presupuesto) {
            return res.status(404).json({
                ok: true,
                msg: 'Presupuesto no existe'

            });
        }

        const cambiosPresupuesto = {
            ...req.body,
            usuario: uid
        }

        const presupuestoActualizado = await Presupuesto.findByIdAndUpdate(id, cambiosPrespuesto, { new: true });

        return res.json({
            ok: true,
            actor: presupuestoActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}
const eliminarPresupuesto = async(req, res = response) => {
    const id = req.params.id;

    try {

        const presupuesto = await Presupuesto.findById(id);
        if (!presupuesto) {
            return res.status(404).json({
                ok: true,
                msg: 'Presupuesto no existe'

            });
        }

        await Presupuesto.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Presupuesto Eliminado'

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}


module.exports = {
    getPresupuestos,
    crearPresupuesto,
    actualizarPresupuesto,
    eliminarPresupuesto
}