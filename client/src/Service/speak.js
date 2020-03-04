function BuildSpeakout () {
  let _voices = null

  const _getVoicesAsync = () =>
    new Promise((resolve, reject) => {
      if (_voices) return resolve(_voices)
      setTimeout(() => {
        try {
          resolve(window.speechSynthesis.getVoices())
        } catch (e) {
          reject(e)
        }
      }, 1000)
    })

  const _talkAsync = async message => {
    try {
      _voices = await _getVoicesAsync()
      const voice = _voices[0] // selecting the first voice
      const utterence = new SpeechSynthesisUtterance(message)
      utterence.voice = _voices[0]
      const sync = window.speechSynthesis
      sync.speak(utterence)
    } catch (e) {
      console.log('Error in getting speeches :', e)
    }
  }

  const _buildGrammer = grammer =>
    `#JSGF V1.0; grammar; public <grammar> =${grammer.join(' | ')};`

  let _grammar = null
  let _recognition = null
  const _setGrammer = grammer => {
    // grammer is currently not supported
    _grammar = _buildGrammer(grammer)
    const speechList = new window["webkitSpeechGrammarList"]()
    speechList.addFromString(_grammar, 1)

    window["SpeechRecognition"] = window["SpeechRecognition"] || window["webkitSpeechRecognition"]
    _recognition = new window["SpeechRecognition"]()
    _recognition.grammar = speechList
    _recognition.lang = 'en-US'
    _recognition.interimResults = false
    _recognition.maxAlternatives = 1
  }

  const _startListening = (
    cb = () => console.log('start listening callback is not provided')
  ) => {
    if (!_recognition) _setGrammer([])
    _recognition.start()
    _recognition.addEventListener('audiostart', cb)
  }

  const _endListening = (
    cb = () => console.log('end listening callback is not provided')
  ) => {
    _recognition.addEventListener('audioend', cb)
  }

  const _setOnResultReady = (
    cb = r => {
      console.log('result ready callback on provided')
    }
  ) => {
    _recognition.onresult = event => {
      const match = event.results[0][0].transcript.toLowerCase()
      cb(match)
    }
  }

  return function Return () {
    const _self = this
    this.setGrammer = grammer => {
      _setGrammer(grammer)
      return _self
    }

    this.start = cb => {
      _startListening(cb)
      return _self
    }

    this.end = cb => {
      _endListening(cb)
      return _self
    }

    this.onResultReady = cb => {
      _setOnResultReady(cb)
      return _self
    }
    this.getVoicesAsync = _getVoicesAsync
    this.talkAsync = message => {
      _talkAsync(message)
      return _self
    }
  }
}
let _instance = null;
BuildSpeakout.createNewInstance = () => {
  if (_instance) return _instance;
  _instance = new (BuildSpeakout())();
  return _instance;
}

exports.BuildSpeakout = BuildSpeakout;
