const app = require('./app')
const {DB_HOST} = require('./config')
const mongoose = require('mongoose')

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
    console.log("Database connection successful")
})
  })
  .catch((err) => {
    console.log(err.message)
    process.exit(1)
  })

  console.log(process.env);
