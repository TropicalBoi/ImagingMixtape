import axios from 'axios'
import SpotifyWebApi from 'spotify-web-api-js'

export const getAccessToken = async () => {
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

  return result.data.access_token
}

export const fetchAlbum = async () => {
  const spotifyApi = new SpotifyWebApi()
  const accessToken = await getAccessToken()
  spotifyApi.setAccessToken(accessToken)
  const result = await spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
  console.log(result)
}
