import { useState } from 'react'
import './App.css'
import Signup from './Components/signup'

function App() {
  const [count, setCount] = useState(0)

  return (
  <>
 <Signup/>
  </>
  )
}

export default App
