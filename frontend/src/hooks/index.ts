import axios from "axios"
import { useEffect, useState } from "react"

interface Blog{
    "content":string,
    "title":string,
    "id":string,
    "author":{
        "name":string
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