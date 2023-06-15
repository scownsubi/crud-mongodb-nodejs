const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Rendirizar el index.ejs para obtener todos los registros
router.get('/obtenerRegistros', async (req, res)=>{
    const tasks = await Task.find();
    const titulo = "Mi aplicación";
    const framework = [
        {nombre: "Angular", inicio: 2005},
        {nombre: "React", inicio: 2010},
    ]

    res.render('index', {
        tasks, // Es lo mismo que decir task: task
        titulo,
        framework
    });
});

router.post('/agregarRegistro', async (req, res)=>{
    const task = new Task(req.body);
    await task.save(); 
    res.redirect('/obtenerRegistros');
});

router.get('/eliminarRegistro/:id', async (req, res)=>{
    const {id} = req.params;
    await Task.remove({_id: id});
    const tasks = await Task.find();
    res.redirect('/obtenerRegistros');
});

// obtener el registro a editar por el id
// y se envía a la página edit.ejs
router.get('/editarRegistro/:id', async (req, res)=>{
    const {id} = req.params;
    const task = await Task.findById(id);
    res.render('edit', {
        task
    });
});

// se edita el registro en la base de datos
router.post('/editarRegistro/:id', async (req, res)=>{
    const{id} = req.params;
    await Task.update({_id:id}, req.body);
    res.redirect('/obtenerRegistros');
});

router.get('/hecho/:id', async (req, res)=>{
    const {id} = req.params;
    const task = await Task.findById(id);
    task.estadocivil = !task.estadocivil;
    await task.save();
    res.redirect('/obtenerRegistros');
});

module.exports = router;

