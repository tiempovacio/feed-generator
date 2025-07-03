import express from 'express'
import pkg from '@atproto/api';
const { BskyAgent } = pkg;
import { filterPost } from './filters/myFeedFilter.js'

const app = express()
const port = process.env.PORT || 3000

const agent = new BskyAgent({ service: 'https://bsky.social' })

// Para pruebas, haz login con cuenta Bluesky válida (opcional)
await agent.login({
  identifier: process.env.BSKY_IDENTIFIER,
  password: process.env.BSKY_PASSWORD,
})

const authors = [
  '9008kivi9023',
  'bidix',
  'chiaraverdadera',
  'condenastan',
  'criaturakivista',
  'curioseando',
  'dancingstorms8',
  'eli23vio',
  'fontvella',
  'jinxcarey',
  'kbessets',
  'kikista1989',
  'kiviseva2501',
  'kivismoobarbarie17',
  'lakikapelirroja',
  'moksi',
  'nosoylesbiana',
  'picobrillo2',
  'sonnetmylv',
  'versoerrante',
  'vio11',
  'yssyyssy'
]

app.get('/feeds/mi-feed-privado-92kxy', async (req, res) => {
  try {
    let allPosts = []

    // Recolectar posts de todos los autores
    for (const author of authors) {
      const feed = await agent.api.app.bsky.feed.getAuthorFeed({
        actor: author,
        limit: 50,
      })
      allPosts = allPosts.concat(feed.data.feed)
    }

    // Filtrar posts
    const filtered = allPosts.filter(filterPost)

    res.json({
      feed: 'Mi Feed Privado',
      count: filtered.length,
      posts: filtered,
    })
  } catch (err) {
    console.error('Error fetching feed:', err)
    res.status(500).json({ error: 'Error fetching feed' })
  }
})

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`)
})