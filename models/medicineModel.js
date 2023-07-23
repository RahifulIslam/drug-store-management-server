const mongoose = require('mongoose');
const Joi = require('joi');

const medicineSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    quantity: {
        type: Number,
        required: true,
      },
      
    actual_price: {
      type: Number,
      required: true,
    },
    selling_price: {
      type: Number,
      required: true,
    },

    generics: {
      type: String,
      required: true,
    },
    
    company: {
      type: String,
      required: true,
    },
    
  });

  const validateMedicine = medicine => {
    const schema = Joi.object({
      name: Joi.string().max(1000).required(),
      type: Joi.string().max(100).required(),
      description: Joi.string().max(2000).required(),
      quantity: Joi.number().integer().required(),
      actual_price: Joi.number().required(),
      selling_price: Joi.number().required(),
      generics: Joi.string().max(100).required(), 
      company: Joi.string().required()
    });

    return schema.validate(medicine)
  };

  module.exports.Medicine = mongoose.model('Medicine', medicineSchema);
  module.exports.validate = validateMedicine;