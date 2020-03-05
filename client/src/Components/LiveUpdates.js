import * as React from 'react'
import work from 'webworkify-webpack'

export const LiveUpdates = props => {
  const startLiveUpdatesActionHandler = () => {
    let w = work(require.resolve('./worker.js'))
    w.addEventListener('message', event => {
      console.log(event.data)
    })
    w.postMessage({ startStream: true })
  }

  return (
    <button onClick={startLiveUpdatesActionHandler}>Start live updates</button>
  )
}
