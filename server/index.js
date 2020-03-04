const express = require('express')
const app = express()

const { applyMiddlewares } = require('./middlewares')
const { addRoutes } = require('./routes')

applyMiddlewares(app)
addRoutes(app)

app.listen(9300, () => {
  console.log('connected')
})
