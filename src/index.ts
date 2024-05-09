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
