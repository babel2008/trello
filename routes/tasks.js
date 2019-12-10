const {Task, validate} = require('../models/task'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const tasks = await Task.find().sort('status');
  res.send(tasks);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);


  const task = new Task({ 
    content: req.body.content,
    status: req.body.status,
    userId: req.body.userId
    
  });
  await task.save();
  
  res.send(task);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  
  const task = await Task.findByIdAndUpdate(req.params.id,
    { 
      content: req.body.content,
      user: {
        _id: user._id,
        name: user.name
      },
      
      status: req.body.status
    }, { new: true });

  if (!task) return res.status(404).send('The task with the given ID was not found.');
  
  res.send(task);
});


router.get('/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).send('The task with the given ID was not found.');

  res.send(task);
});

module.exports = router; 