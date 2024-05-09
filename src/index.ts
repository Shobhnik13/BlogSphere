import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono<{
  Bindings:{
    DATABASE_URL: string
  }
}>()

app.get('/', (c) => {
  const prisma=new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())  
  return c.text('Hello Hono!')
})


app.get('/test', (c) => {
  return c.text('Hello Hono2!')
})


export default app
