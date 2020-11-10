const { response } = require('express');
const Edicion = require('../models/edicionModel');

const getEdiciones = async(req, res = response) => {
    const ediciones = await Edicion.find().
    populate('usuario', 'nombre img').
    populate('pelicula', 'nombre img');

    res.json({
        ok: true,
        ediciones
    });
}
const crearEdicion = async(req, res = response) => {
    const uid = req.uid;

    const edicion = new Edicion({
        usuario: uid,
        ...req.body
    });

    try {

        const edicionDB = await actor.save();
        res.json({
            ok: true,
            edicion: edicionDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }
}
const actualizarEdicion = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const edicion = await Actor.findById(id);
        if (!edicion) {
            return res.status(404).json({
                ok: true,
                msg: 'Edicion no existe'

            });
        }

        const cambiosEdicion = {
            ...req.body,
            usuario: uid
        }

        const edicionActualizado = await Edicion.findByIdAndUpdate(id, cambiosEdicion, { new: true });

        return res.json({
            ok: true,
            actor: edicionActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}
const eliminarEdicion = async(req, res = response) => {
    const id = req.params.id;

    try {

        const edicion = await Edicion.findById(id);
        if (!edicion) {
            return res.status(404).json({
                ok: true,
                msg: 'Edicion no existe'

            });
        }

        await Edicion.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Edicion Eliminado'

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
    getEdiciones,
    crearEdicion,
    actualizarEdicion,
    eliminarEdicion
}