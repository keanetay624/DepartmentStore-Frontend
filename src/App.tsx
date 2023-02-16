import { useState } from 'react'
import ButtonAppBar from './components/App-Bar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <ButtonAppBar />
    </div>
  )
}

export default App
