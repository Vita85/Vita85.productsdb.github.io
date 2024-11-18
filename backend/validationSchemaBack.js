const Joi = require('joi')

const validationSchema = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  description: Joi.string().min(2).max(200).required(),
  price: Joi.number().min(1).max(9999).required()
})

module.exports = validationSchema;