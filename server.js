const app = require('./app')

const mongoose = require('mongoose')

const DB_HOST = 'mongodb+srv://jullyrud:Sosison23sm@cluster0.pnxjq0y.mongodb.net/contacts_reader?retryWrites=true&w=majority'

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000")
})
  })
  .catch((err) => {
    console.log(err.message)
    process.exit(1)
  })
