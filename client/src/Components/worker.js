class ServerSideStream {
  static createNewInstance () {
    return new ServerSideStream()
  }

  constructor (url) {
    this._url = url
  }

  startLiveUpdates (url = 'http://localhost:9300/live-bus-status') {
    this._eventSource = new EventSource(url)
    return this
  }

  registerMessageHandler (
    cb = m => console.log('Message:', JSON.stringify(m))
  ) {
    if (!this.isEventSourceAvaiable()) return
    this._eventSource.onmessage = cb
    return this
  }

  registerErrorHandler (cb = e => console.log('Error:', e)) {
    if (!this.isEventSourceAvaiable()) return
    const _eventSource = this._eventSource
    this._eventSource.onerror = e => {
      cb(e)
      _eventSource.close()
    }
    return this
  }

  isEventSourceAvaiable () {
    return this._eventSource instanceof EventSource
  }

  registerPingHandler (cb = e => console.log('ping results:', e)) {
    this._eventSource.addEventListener('ping', cb)
  }
}

module.exports = function worker (self) {
  self.addEventListener('message', event => {
    const startStream = event?.data?.startStream ?? false
    if (startStream) {
      ServerSideStream.createNewInstance()
        .startLiveUpdates()
        .registerErrorHandler(_ => console.log(_))
        .registerMessageHandler(m => self.postMessage(JSON.parse(m.data)))
    }
  })
}
