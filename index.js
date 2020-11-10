require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbconection } = require('./database/config');
const app = express();

app.use(cors());

app.use(express.json());

dbconection();

app.use('/api/usuarios', require('./routes/usuariosRoute'));
app.use('/api/login', require('./routes/authRoute'));
app.use('/api/peliculas', require('./routes/peliculasRoute'));
app.use('/api/actores', require('./routes/actoresRoute'));
app.use('/api/ediciones', require('./routes/edicionesRoute'));
app.use('/api/presupuestos', require('./routes/presupuestosRoute'));
app.use('/api/buscar', require('./routes/busquedasRoute'));
app.use('/api/upload', require('./routes/uploadsRoute'));

app.listen(process.env.PORT, () => {
    console.log('Practica IngWEB - Servidor corriendo en el puerto ' + process.env.PORT);
})