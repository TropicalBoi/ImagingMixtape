import { useState, useEffect } from 'react'
import axios from 'axios'
import { tables } from './api/request'
import reactLogo from './assets/react.svg'
import SpotifyWebApi from 'spotify-web-api-js'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const fetch = async () => {
    const res = await tables()
    console.log(res)
  }

  const getAccessToken = async () => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
    const encoded = btoa(clientId + ':' + clientSecret)

    const result = await axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      data: "grant_type=client_credentials",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${encoded}`
      },
      auth: {
        username: clientId,
        password: clientSecret
      },
    })
    console.log(result)

    return result.data.access_token
  }

  const fetchAlbum = async () => {
    const spotifyApi = new SpotifyWebApi()
    const accessToken = await getAccessToken()
    console.log(accessToken)
    spotifyApi.setAccessToken(accessToken)
    const result = await spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
    console.log(result)
  }

  useEffect(() => {
    fetch()
    fetchAlbum()
  }, [])

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
