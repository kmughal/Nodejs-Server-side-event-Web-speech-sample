const bodyParser = require('body-parser')
const cors = require('cors')

exports.applyMiddlewares = app => {
  if (app.use) {
    app.use(cors())
    app.use(bodyParser.json({ type: 'application/*+json' }))
    app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
    app.use(bodyParser.text({ type: 'text/html' }))
  }
}
