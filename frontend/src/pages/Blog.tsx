import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import SingleBlog from "../components/SingleBlog"

const Blog = () => {
  const { id }=useParams()
  const {loading,blog}=useBlog({id:id || ""})
  if(loading){
    return <div>Loading...</div>
  }
  console.log(blog);
  
  return (
    <div><SingleBlog/></div>
  )
}

export default Blog