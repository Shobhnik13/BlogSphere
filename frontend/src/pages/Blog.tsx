import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import SingleBlog from "../components/SingleBlog"
import Navbar from "../components/Navbar"




const Blog = () => {
  const { id }=useParams()
  const {loading,blog}=useBlog({id:id || ""})
  if(loading){
    return <div>Loading...</div>
  }
  // console.log(blog);
  
  return (
    <div>
        <SingleBlog blog={blog || ""}/>
    </div>
  )
}

export default Blog