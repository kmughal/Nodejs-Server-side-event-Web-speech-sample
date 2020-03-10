const path = require('path')
const fs = require('fs')

exports.addRoutes = app => {
  if (app.get) {
    app.get('/bus', getMockJson)
    app.get('/live-bus-status', liveBusStatus)
    app.get('/api/minutes', addStaleCacheResponse)
    app.get('*', helloWorldTextMessage)
  }
}

function addStaleCacheResponse (req, res) {
  res.append('Cache-Control', 'max-age=1, stale-while-revalidate=59')
  const minutes = new Date().getMinutes()
  res.send({ minutes })
}

function helloWorldTextMessage (_, res) {
  res.append('Cache-Control', 'max-age=1, stale-while-revalidate=59')
  res.status(200).send('hello world')
}

function getMockJson (req, res) {
  const fullMockFilePath = path.resolve(__dirname, 'mock', 'fake-response.json')
  const fileCotents = fs.createReadStream(fullMockFilePath)
  fileCotents.pipe(res)
}

let clients = []
let counter = 0
function liveBusStatus (req, res) {
  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache'
  }

  res.writeHead(200, headers)
  startLiveUpdatesForBus(res)

  let response = {
    counter: counter++,
    dateString: new Date().toString()
  }

  const data = `data: ${JSON.stringify(response)}\n\n`
  res.write(data)

  const clientId = addClient(res)
  removeClientOnceConnectionIsClosed(req, clientId)
}

function startLiveUpdatesForBus (_) {
  setInterval(() => getNewResponseAndNotifyAllClients(), 1000)
}

function removeClientOnceConnectionIsClosed (req, clientId) {
  req.on('close', () => {
    console.log(`${clientId} Connection closed`)
    clients = clients.filter(c => c.id !== clientId)
  })
}

function getNewResponseAndNotifyAllClients () {
  let response = {
    counter: counter++,
    dateString: new Date().toString()
  }
  console.log('sending message to :', clients.length)
  clients.forEach(c => c.res.write(`data: ${JSON.stringify(response)}\n\n`))
}

function addClient (res) {
  const clientId = Date.now()
  const newClient = {
    id: clientId,
    res
  }
  clients.push(newClient)
  return clientId
}
