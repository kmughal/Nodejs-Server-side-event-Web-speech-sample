import * as React from 'react'
import { render } from 'react-dom'
import { LiveUpdates } from '../src/Components/LiveUpdates'
import { Speak } from '../src/Components/Speak'
 
const App = () => {

  return (
    <>
     <h1>hello</h1>
       <LiveUpdates/>
       <Speak></Speak>
      <div id='output'></div>
    </>
  )
}

render(<App />, document.getElementById('app'))
