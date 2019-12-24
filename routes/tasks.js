const {Task, validate} = require('../models/task');
const  auth = require('../middleware/auth'); 
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const tasks = await Task.find().sort('status');
  res.send(tasks);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);


  const task = new Task({ 
    content: req.body.content,
    status: req.body.status,
    user: {
      _id: user._id,
      name: user.name
    }
    
  });
  await task.save();
  
  res.send(task);
});

router.put('/:id', auth, async (req, res) => {
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


router.get('/:id', auth, async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).send('The task with the given ID was not found.');

  res.send(task);
});

module.exports = router; 