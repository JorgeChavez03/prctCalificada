const { response } = require('express');
const Usuario = require('../models/usuarioModel');
const Actor = require('../models/actorModel');
const Pelicula = require('../models/peliculaModel');
const Edicion = require('../models/edicionModel');
const Presupuesto = require('../models/presupuestoModel');


const getBusquedaGlobal = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regexp = new RegExp(busqueda, 'i'); // i es de insensible

    // Este codigo funciona pero demora mas
    // const usuarios = await Usuario.find({ nombre: regexp });
    // const investigadores = await Investigador.find({ nombre: regexp });
    // const proyectos = await Proyecto.find({ nombre: regexp });

    const [usuarios, actores, peliculas, ediciones, presupuestos] = await Promise.all([
        Usuario.find({ nombre: regexp }),
        Actor.find({ nombre: regexp }),
        Pelicula.find({ nombre: regexp }),
        Edicion.find({ nombre: regexp }),
        Presupuesto.find({ nombre: regexp })
    ]);


    res.json({
        ok: true,
        msg: 'getBusquedaGlobal',
        usuarios,
        actores,
        peliculas,
        ediciones,
        presupuestos
    });

}

const getBusquedaPorColleccion = async(req, res = response) => {

    const coleccion = req.params.coleccion;
    const busqueda = req.params.busqueda;
    const regexp = new RegExp(busqueda, 'i'); // i es de insensible

    let data = [];


    switch (coleccion) {
        case 'peliculas':
            data = await Pelicula.find({ nombre: regexp })
                .populate('usuario', 'nombre img');
            break;

        case 'actores':
            data = await Actor.find({ nombre: regexp })
                .populate('usuario', 'nombre img')
                .populate('pelicula', 'nombre img');
            break;
        case 'ediciones':
            data = await Edicion.find({ nombre: regexp })
                .populate('usuario', 'nombre img');
            break;
        case 'presupuestos':
            data = await Presupuesto.find({ nombre: regexp })
                .populate('usuario', 'nombre img');
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regexp });
            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La coleccion debe ser presupuestos-ediciones-peliculas-actores-usuarios'
            });

    }
    res.json({
        ok: true,
        resultados: data
    });
}

module.exports = {
    getBusquedaGlobal,
    getBusquedaPorColleccion
}