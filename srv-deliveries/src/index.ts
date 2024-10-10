import { serve } from '@hono/node-server'
import { Hono } from 'hono'

import deliveries from './routes/deliveries'

const app = new Hono()

const port = 3000
console.log(`Server is running on port ${port}`)

app.route('/api', deliveries)

app.use("*", (c) => {
  return c.json({ msg: '404 oups' }, 404)
})

serve({
  fetch: app.fetch,
  port
})
