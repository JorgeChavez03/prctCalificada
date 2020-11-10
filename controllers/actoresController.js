const { response } = require('express');
const Actor = require('../models/actorModel');

const getActores = async(req, res = response) => {
    const actores = await Actor.find().
    populate('usuario', 'nombre img').
    populate('pelicula', 'nombre img');

    res.json({
        ok: true,
        actores
    });
}
const crearActor = async(req, res = response) => {
    const uid = req.uid;

    const actor = new Actor({
        usuario: uid,
        ...req.body
    });

    try {

        const actorDB = await actor.save();
        res.json({
            ok: true,
            actor: actorDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }
}
const actualizarActor = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const actor = await Actor.findById(id);
        if (!actor) {
            return res.status(404).json({
                ok: true,
                msg: 'Actor no existe'

            });
        }

        const cambiosActor = {
            ...req.body,
            usuario: uid
        }

        const actorActualizado = await Actor.findByIdAndUpdate(id, cambiosActor, { new: true });

        return res.json({
            ok: true,
            actor: actorActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}
const eliminarActor = async(req, res = response) => {
    const id = req.params.id;

    try {

        const actor = await Actor.findById(id);
        if (!actor) {
            return res.status(404).json({
                ok: true,
                msg: 'Actor no existe'

            });
        }

        await Actor.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Actor Eliminado'

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
    getActores,
    crearActor,
    actualizarActor,
    eliminarActor
}