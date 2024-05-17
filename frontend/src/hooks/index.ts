import axios from "axios"
import { useEffect, useState } from "react"

export interface Blog{
    "content":string,
    "title":string,
    "id":string,
    "author":{
        "name":string
    }
}
export const useBlog=({id}:{id:string})=>{
    const [loading,setLoading]=useState(true)
    const [blog,setBlog]=useState<Blog>()

    useEffect(()=>{
        const fetchBlogById=async()=>{
            const res=await axios.get(`https://news-app.shobhnikw.workers.dev/api/v1/blogs/${id}`,{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            })
            setBlog(res.data.blog)
            setLoading(false)
        }
        fetchBlogById()
    },[id])
    return{
        loading,
        blog
    }
}



export const useBlogs=()=>{
    const [loading,setLoading]=useState(true)
    const [blogs,setBlogs]=useState<Blog[]>([])
    useEffect(()=>{
        const fetchBlogs=async()=>{
            const res=await axios.get('https://news-app.shobhnikw.workers.dev/api/v1/blogs/bulk',{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            })
            setBlogs(res.data.blogs)
            setLoading(false)
        }
        fetchBlogs()
    },[])
    return{
        loading,
        blogs
    }
}