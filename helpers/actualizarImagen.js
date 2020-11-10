const fs = require('fs'); // para el manejo del sistema de archivos

const Usuario = require('../models/usuarioModel');
const Pelicula = require('../models/peliculaModel');
const Actor = require('../models/actorModel');
const Edicion = require('../models/edicionModel');
const Presupuesto = require('../models/presupuestoModel');


const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}



const actualizarImagen = async(coleccion, id, nombreArchivo) => {
    let pathViejo = '';
    switch (coleccion) {
        case 'actores':
            const actor = await Actor.findById(id);
            if (!actor) {
                console.log(' No se encontró id del actor');
                return false;
            }
            pathViejo = `./uploads/actores/${actor.img}`;
            borrarImagen(pathViejo);
            actor.img = nombreArchivo;
            await actor.save();
            return true;

            break;
        case 'peliculas':
            const pelicula = await Pelicula.findById(id);
            if (!pelicula) {
                console.log(' No se encontró id de la pelicula');
                return false;
            }
            pathViejo = `./uploads/peliculas/${pelicula.img}`;
            borrarImagen(pathViejo);
            pelicula.img = nombreArchivo;
            await pelicula.save();
            return true;

            break;

        case 'ediciones':
            const edicion = await Edicion.findById(id);
            if (!edicion) {
                console.log(' No se encontró id de la edicion');
                return false;
            }
            pathViejo = `./uploads/ediciones/${edicion.img}`;
            borrarImagen(pathViejo);
            edicion.img = nombreArchivo;
            await edicion.save();
            return true;

            break;
        case 'presupuestos':
            const presupuesto = await Presupuesto.findById(id);
            if (!proyecto) {
                console.log(' No se encontró id del presupuesto');
                return false;
            }
            pathViejo = `./uploads/presupuestos/${presupuesto.img}`;
            borrarImagen(pathViejo);
            presupuesto.img = nombreArchivo;
            await presupuesto.save();
            return true;

            break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log(' No se encontró id del usuario');
                return false;
            }
            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

            break;



        default:
            break;
    }



}


module.exports = {
    actualizarImagen
}