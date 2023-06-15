const express = require('express')
const router = express.Router()
const Task = require('../models/task')

// obtener todos los registros
router.get('/obtenerRegistros', async (req, res)=>{
    const tasks = await Task.find();
    res.json(tasks)
});

// obtener un registro
router.get('/obtenerRegistro/:id', async (req, res)=>{
    const {id} = req.params
    const task = await Task.findById(id)
    res.json(task)
});

// agregar un registro
router.post('/agregarRegistro', async (req, res)=>{
    const task = new Task(req.body)
    await task.save()
    res.redirect('/obtenerRegistros')
});

// eliminar un registro
router.get('/eliminarRegistro/:id', async (req, res)=>{
    const {id} = req.params
    await Task.remove({_id: id})
    res.redirect('/obtenerRegistros')
});

// editar un registro
router.post('/editarRegistro/:id', async (req, res)=>{
    const{id} = req.params
    await Task.update({_id:id}, req.body)
    res.redirect('/obtenerRegistros')
});

module.exports = router

