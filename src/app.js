const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Librería para el motor de plantillas ejs
const engine = require('ejs-locals');

const app = express();

mongoose.connect('mongodb://localhost/crud-mongodb-nodejs')
    .then(
        db => console.log('Base de Datos Conectado: ')
    )
    .catch(
        err => console.log(err)
    );

// --- Importación de rutas --- //
const indexRoutes = require('./routes/index');

// --- Configuraciones ---//
app.set('port', process.env.PORT || 8080);
// Configurar las vistas in el módulo path
// app.set('views', __dirname + '/views'); 
// constante __dirname obtiene la ruta actual
// Configurar las vistas con el módulo path
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Motor de plantillas integrado en exppres
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// --- middlewares --- //
// Realizar alguna acción con los datos que vienen de la vista, antes
// de llegar a las rutas, por ejemplo imprimir en consola.
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));

// --- rutas --- //
app.use('/', indexRoutes);

// --- Iniciando el servidor ---//
app.listen(app.get('port'), ()=>{
    console.log(`Puerto del servidor: ${app.get('port')}`);
});