const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el modelo de tareas
// Crear un objeto Schema
const TaskSchema = new Schema({
    nombre: String,
    apellido: String,
    informacion: String, 
    estadocivil: { // false: solter(a), true: casado(a), por default es soltero(a)
        type: Boolean,
        default: false
    }
});

// Convertir la tarea a un modelo mongoose
module.exports = mongoose.model('tareas', TaskSchema);