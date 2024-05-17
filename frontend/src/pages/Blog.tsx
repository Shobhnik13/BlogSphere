import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import SingleBlog from "../components/SingleBlog"
import { Spinner } from "../components/Spinner"
import Navbar from "../components/Navbar"




const Blog = () => {
  const { id }=useParams()
  const {loading,blog}=useBlog({id:id || ""})
  if (loading || !blog) {
    return <div>
        <Navbar />
    
        <div className="h-screen flex flex-col justify-center">
            
            <div className="flex justify-center">
                <Spinner />
            </div>
        </div>
    </div>
}
  return (
    <div>
        <SingleBlog blog={blog || ""}/>
    </div>
  )
}

export default Blog