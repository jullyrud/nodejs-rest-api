const express = require('express')

const contacts = require('../../models/contacts')
const { HttpError } = require('../../helpers')
const Joi = require ('joi')

const router = express.Router() 
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts()
  res.json(result)
  }
  catch (error) {
    next(error)
    // res.status(500).json({message: "server error"})
  }
  
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, 'not found');
      }
    res.json(result)
  }
  catch (error) {
        next(error)
  }

})

router.post('/', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message)
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result)
  }
  catch (error) {
    next(error)
  }
 
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId)
    res.json(result)
  }
  catch (error) {
   next(error)  
  }
  
})

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  try {
   if (!body) {
      throw HttpError(400, {"message": "missing fields"})
    } 
    const result = await contacts.updateContact(contactId, body);
    res.json(result)
    
  }
  catch (error) {
   next(error) 
  }
})

module.exports = router
