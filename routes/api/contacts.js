const express = require('express')

const { Contact } = require('../../models/contact')
const { schemas } = require('../../models/contact')
 const { HttpError } = require('../../helpers')

const router = express.Router() 


router.get('/', async (req, res, next) => {
  try {
    const result = await Contact.find()
  res.json(result)
  }
  catch (error) {
    next(error)
    // res.status(500).json({message: "server error"})
  }
  
})

// router.get('/:contactId', async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contacts.getContactById(contactId);
//     if (!result) {
//       throw HttpError(404, 'not found');
//       }
//     res.json(result)
//   }
//   catch (error) {
//         next(error)
//   }

// })

router.post('/', async (req, res, next) => {
  try {
    const {error} = schemas.addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message)
    }
    const result = await Contact.create(req.body);
    console.log(req.body);
    res.status(201).json(result)
  }
  catch (error) {
    next(error)
  }
 
})

// router.delete('/:contactId', async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contacts.removeContact(contactId)
//     res.json(result)
//   }
//   catch (error) {
//    next(error)  
//   }
  
// })

// router.put('/:contactId', async (req, res, next) => {
//   const { contactId } = req.params;
//   const body = req.body;
//   try {
//    if (!body) {
//       throw HttpError(400, {"message": "missing fields"})
//     } 
//     const result = await contacts.updateContact(contactId, body);
//     res.json(result)
    
//   }
//   catch (error) {
//    next(error) 
//   }
// })

module.exports = router
