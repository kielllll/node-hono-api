require('dotenv').config()
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import items from './routes/items'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello!')
})

app.route('/api/items', items)

const port = (process.env.PORT || 3000) as number
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})
