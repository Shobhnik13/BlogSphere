import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

const app = new Hono<{
  Bindings:{
    DATABASE_URL: string,
    JWT_SECRET:string
  }
}>()

//middleware to check user authorisation
app.use('/api/v1/blog/*',async(c,next)=>{
  const headers=c.req.header('authorization') || ""
  // now we have the headers extracted as authorization
  // we just need the jwt token from the bearer token present in headers extraction
  // Bearer huy38748rh38ry3893ry3 ->splitting token in 2 parts based on the space between ["bearer","hdjsidh8378937"] -> extracting the 1 index of splitted token "hdjshdjsd7878"
  const token=headers.split(' ')[1]
  const isVerified=await verify(token,c.env.JWT_SECRET)
  if(isVerified.id){
    next()
  }else{
    c.status(403)
    c.json({error:'unauthorized'})
  }
})


app.post('/api/v1/signup', async(c) => {
  const prisma=new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())  

  const body=await c.req.json() 

  try{
    const userExsits=await prisma.user.findUnique({
      where:{
        email:body.email
      }
    })
  
    if(userExsits){
      c.status(403)
      return c.json({error:'user already exists'})
    }

    const user = await prisma.user.create({
      data: {
         email: body.email,
         password: body.password,
      },
   });
   const token= await sign({id: user.id},c.env.JWT_SECRET)
   return c.json({token})
  }catch(e){
    c.status(403)
    return c.json({error:'Error while signing up!'})
  }

})


app.post('/api/v1/signin',async(c)=>{
  const prisma=new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const body=await c.req.json()

  const user=await prisma.user.findUnique({
    where:{
      email:body.email
    }
  })

  if(!user){
    c.status(403)
    return c.json({error:'user not found'})
  }
  const jwt=await sign({id: user.id},c.env.JWT_SECRET)
  return c.json({jwt})

})

app.get('/test', (c) => {
  return c.text('Hello Hono2!')
})


export default app
