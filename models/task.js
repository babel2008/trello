const Joi = require('joi');
const mongoose = require('mongoose');

const Tasks = mongoose.model('Tasks', new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  
  status: { 
    type: String, 
    enum : ['new','during', 'finished'],
    default: 'new',
    required: true
    
  },
  userId: { 
    type: String, 
    required: true,
    min: 0,
    max: 255
  }
}));

function validateTasks(task) {
  const schema = {
    content: Joi.string().min(5).max(255).required(),
    status: Joi.string().min(3).required(),
    userId: Joi.string().min(3).required()
  };

  return Joi.validate(task, schema);
}

exports.Task = Tasks; 
exports.validate = validateTasks;