const express = require('express')
const app = express()

const { applyMiddlewares } = require('./middlewares')
const { addRoutes } = require('./routes')

applyMiddlewares(app)
addRoutes(app)
const portNumber = process.env.PORT || 9300
app.listen(portNumber, () => {
  console.log('connected : ' , portNumber)
})
