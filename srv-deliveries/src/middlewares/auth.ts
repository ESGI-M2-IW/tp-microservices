import { createMiddleware } from 'hono/factory'

const guard = createMiddleware(async (c, next) => {
    const apiKey = c.req.header('x-api-key')
    
    if (!apiKey) {
        return c.json({ message: 'Missing API key' }, 401)
    }

    if (apiKey !== process.env.API_KEY) {
        return c.json({ message: 'Invalid API key' }, 401)
    }

  await next()
})

export {guard}