import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

export const blogRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string,
    }
}>()
const JWT_SECRET="hahahahahahahahahahahahah"

blogRouter.use('/*',async(c,next)=>{
    const authHeader=c.req.header("authorization")
    
    next()
})


// create blog post 
blogRouter.post('/create', async(c)=>{
    const body= await c.req.json()
    const prisma= await new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog=await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:"1"
        }
    })
    c.json({
        id:blog.id
    })
})

// update blog post 
blogRouter.put('/update',async(c)=>{
    const body=await c.req.json()
    const prisma= await new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
        try{
            const blog=await prisma.post.update({
                where:{
                    id:body.id
                },
                data:{
                    title:body.title,
                    content:body.content
                }
            })
            return c.json({
                id:blog.id
            }) 
        }catch(e){
            c.status(411)
            c.json({
                message:"Error while updating blog"
            })
        }
// get blog
    blogRouter.get('/',async(c)=>{
        const body=await c.req.json()
        const prisma = await new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL
        }).$extends(withAccelerate())
        try{
            const blog=await prisma.post.findFirst({
                where:{
                    id:body.id
                }
            })
            return c.json({
                blog
            })
        }catch(e){
            c.status(411)
            c.json({
                message:"Error while fetching blog post"
            })
        }
    })
})
// get all blogs 
blogRouter.get('/bulk',async(c)=>{
    const prisma= new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs=await prisma.post.findMany()
    c.json({blogs})
})

