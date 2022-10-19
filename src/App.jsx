import { useEffect } from 'react'
import { tables } from './api/request'
import { fetchAlbum } from './api/spotify'
import './App.css'

function App() {
  const fetch = async () => {
    const res = await tables()
    console.log(res)
  }

  useEffect(() => {
    fetch()
    fetchAlbum()
  }, [])

  return (
    <div className="App">
      
    </div>
  )
}

export default App
