import * as React from 'react'
import { ServerSideStream } from '../Service/server-side-stream'
import { toggleBackgroundClass,removeErrorClass } from '../common/style-helpers'


export const LiveUpdates = props => {
  const startLiveUpdatesActionHandler = () =>
    ServerSideStream.createNewInstance()
      .startLiveUpdates()
      .registerErrorHandler(_ => toggleBackgroundClass("error-class"))
      .registerMessageHandler(m => {
        removeErrorClass()
        let data = JSON.parse(m.data)
        console.log('Data received : ', data)
      })

  return (
    <button onClick={startLiveUpdatesActionHandler}>Start live updates</button>
  )
}
 