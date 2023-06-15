const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Rendirizar el index.ejs
router.get('/', async (req, res)=>{
    const tasks = await Task.find();
    res.json(tasks)
    // console.log(tasks);

    res.render('index', {
        tasks // Es lo mismo que decir task: task
    });
});

router.post('/agregarRegistro', async (req, res)=>{
    // console.log(req.body);
    // console.log(new Task(req.body));
    const task = new Task(req.body);
    await task.save(); // ejecutar eventos asincronos, 
                 // como el almacenado de datos
                 // task.save().then(err=>console.log(err));
    // res.send('Peticion recibida');
    res.redirect('/');
});

router.get('/editarRegistro/:id', async (req, res)=>{
    const {id} = req.params;
    const task = await Task.findById(id);
    res.render('edit', {
        task
    });
});

router.post('/editarRegistro/:id', async (req, res)=>{
    const{id} = req.params;
    await Task.update({_id:id}, req.body);
    res.redirect('/');
});

router.get('/hecho/:id', async (req, res)=>{
    // console.log(req.params);
    const {id} = req.params;
    const task = await Task.findById(id);

    
    task.estadocivil = !task.estadocivil;
    await task.save();
    //console.log(task);
    //res.send('Peticion recibida');
    //await Task.remove({_id: id});
    res.redirect('/');
});

router.get('/eliminarRegistro/:id', async (req, res)=>{
    // console.log(req.params);
    const {id} = req.params;
    // res.send('Peticion recibida');
    await Task.remove({_id: id});

    const tasks = await Task.find();
    console.log(tasks);
    res.json(tasks)

    //res.redirect('/');
});

module.exports = router;

