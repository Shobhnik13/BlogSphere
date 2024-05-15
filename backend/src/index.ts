import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { userRouter } from './routes/userRouter'
import { blogRouter } from './routes/blogRouter'
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings:{
    DATABASE_URL: string,
  }
}>()

//cors
app.use('/*',cors())

// all api routing
app.route('/api/v1/users',userRouter)
app.route('/api/v1/blogs',blogRouter)


// test route
app.get('/test', (c) => {
  return c.text('Hello world!')
})


export default app