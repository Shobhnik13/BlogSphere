import { useEffect } from "react"
import BlogCard from "../components/BlogCard"
import Navbar from "../components/Navbar"
import axios from "axios"
import { useBlogs } from "../hooks"

const Blogs = () => {
 const { loading , blogs }=useBlogs()
    if(loading){
      return <div>Loading...</div>
    }
    // console.log(blogs);
    
  return (
    <div>
      <Navbar/>
      <div className="flex justify-center">
        <div className="max-w-xl">
          <BlogCard title="ahdshdjsd" content="dyuyusgdhsgdsdg837rdg3g39r8gf3v" authorName="abcd" publishedDate="2 feb 2000"/>
          <BlogCard title="ahdshdjsd" content="dyuyusgdhsgdsdg837rdg3g39r8gf3v" authorName="abcd" publishedDate="2 feb 2000"/>
          <BlogCard title="ahdshdjsd" content="dyuyusgdhsgdsdg837rdg3g39r8gf3v" authorName="abcd" publishedDate="2 feb 2000"/>
        </div>
      </div>
  </div>
  )
}

export default Blogs