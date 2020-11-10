const { response } = require('express');
const Pelicula = require('../models/peliculaModel');

const getPeliculas = async(req, res = response) => {

    const peliculas = await Pelicula.find().populate('usuario', 'nombre img');


    res.json({
        ok: true,
        peliculas
    });
}
const crearPelicula = async(req, res = response) => {
    const uid = req.uid;

    const pelicula = new Pelicula({
        usuario: uid,
        ...req.body
    });

    try {

        const peliculaDB = await pelicula.save();
        res.json({
            ok: true,
            pelicula: peliculaDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }


}
const actualizarPeliucla = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const pelicula = await Pelicula.findById(id);
        if (!pelicula) {
            return res.status(404).json({
                ok: true,
                msg: 'Pelicula no existe'

            });
        }

        const cambiosPelicula = {
            ...req.body,
            usuario: uid
        }

        const peliculaActualizado = await Pelicula.findByIdAndUpdate(id, cambiosPelicula, { new: true });

        return res.json({
            ok: true,
            pelicula: peliculaActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }


}
const eliminarPelicula = async(req, res = response) => {
    const id = req.params.id;

    try {

        const pelicula = await Pelicula.findById(id);
        if (!pelicula) {
            return res.status(404).json({
                ok: true,
                msg: 'Pelicula no existe'

            });
        }

        await Pelicula.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Pelicula Eliminado'

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
    getPeliculas,
    crearPelicula,
    actualizarPeliucla,
    eliminarPelicula
}