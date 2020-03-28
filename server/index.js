const express = require('express')
const app = express()
const figlet = require('figlet')
const { applyMiddlewares } = require('./middlewares')
const { addRoutes } = require('./routes')

applyMiddlewares(app)
addRoutes(app)

const portNumber = process.env.PORT || 9300
app.listen(portNumber, () => {
  
  figlet('Khurram Shahzad', (e, r) => {
    console.log(r)
  })
  console.log('connected : ', portNumber)
})
