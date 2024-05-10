import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { userRouter } from './routes/userRouter'
import { blogRouter } from './routes/blogRouter'

const app = new Hono<{
  Bindings:{
    DATABASE_URL: string,
    JWT_SECRET:string
  }
}>()
const JWT_SECRET="chalajabhosdike"

//middleware to check user authorisation
app.use('/api/v1/blog/*',async(c,next)=>{
  const headers=c.req.header('authorization') || ""
  // now we have the headers extracted as authorization
  // we just need the jwt token from the bearer token present in headers extraction
  // Bearer huy38748rh38ry3893ry3 ->splitting token in 2 parts based on the space between ["bearer","hdjsidh8378937"] -> extracting the 1 index of splitted token "hdjshdjsd7878"
  const token=headers.split(' ')[1]
  const isVerified=await verify(token,JWT_SECRET)
  if(isVerified.id){
    next()
  }else{
    c.status(403)
    c.json({error:'unauthorized'})
  }
})

// all api routing
app.route('/api/v1/users',userRouter)
app.route('/api/v1/blogs',blogRouter)


// test route
app.get('/test', (c) => {
  return c.text('Hello world!')
})


export default app
