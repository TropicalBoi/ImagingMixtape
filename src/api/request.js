import axios from 'axios'

const config = {
  headers: {
    "Authorization": `Bearer ${import.meta.env.VITE_API_KEY}`,
  }
}

export const tables = async () => {
  return await axios.get("https://api.airtable.com/v0/appqFEOQnCcbDegfP/Table%201?maxRecords=3&view=Grid%20view", config)
}

