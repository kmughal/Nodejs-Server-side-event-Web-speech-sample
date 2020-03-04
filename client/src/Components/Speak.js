import * as React from 'react'
import { BuildSpeakout } from '../Service/speak'
import { toggleBackgroundClass } from '../common/style-helpers'

export const Speak = props => {
  const speakActionHandler = event => {
    let instance = BuildSpeakout.createNewInstance()
    instance
      .start(() => toggleBackgroundClass('process-speech'))
      .end(() => toggleBackgroundClass('process-speech'))
      .onResultReady(data => instance.talkAsync(data))
  }

  return <button onClick={speakActionHandler}>Speak</button>
}
