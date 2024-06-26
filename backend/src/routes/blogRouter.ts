import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@shobhnik13/zod_types";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string,
    },
    Variables:{
        userId:string,
    }
}>()

// middleware for authorised user
blogRouter.use('/*',async(c,next)=>{
    const authHeader = c.req.header('authorization')||"";
  const user = await verify(authHeader, c.env.JWT_SECRET)
  if(user){
    c.set("userId",user.id)
  }
  else{
    c.status(403);
    return c.json({
      msg:"You are not logged in"
    })
  }
  await next();
})


// create blog post 
blogRouter.post('/create', async(c)=>{
    const body= await c.req.json()
    const authorId=c.get('userId')
    const prisma= new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog=await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:authorId
        }
    })
    return c.json({
        id:blog.id
    })
})

// update blog post 
blogRouter.put('/update',async(c)=>{
    const body=await c.req.json()
    const { success }=updateBlogInput.safeParse(body)
    if(!success){
        c.status(411)
        return c.json({message:"Incorrect inputs!"})
    }
    const prisma= new PrismaClient({
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
    })

    // get all blogs 
blogRouter.get('/bulk',async(c)=>{
    const prisma= new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs=await prisma.post.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    })
    return c.json({blogs})
})

        
// get blog by id
    blogRouter.get('/:id',async(c)=>{
        const id = c.req.param("id");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
    
        return c.json({
            blog
        });
    } catch(e) {
        c.status(411); // 4
        return c.json({
            message: "Error while fetching blog post"
        });
    }
    })

