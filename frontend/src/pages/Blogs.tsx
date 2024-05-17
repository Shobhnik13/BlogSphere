import BlogCard from "../components/BlogCard"
import Navbar from "../components/Navbar"
import { useBlogs } from "../hooks"
import { BlogSkeleton } from "../components/BlogSkeleton"

const Blogs = () => {
 const { loading , blogs }=useBlogs()
 if (loading) {
  return <div>
      <Navbar /> 
      <div  className="flex justify-center">
          <div>
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
          </div>
      </div>
  </div>
}
    // console.log(blogs);
    
  return (
    <div className="overflow-x-hidden">
    <Navbar />
    <div className="w-screen flex items-center justify-center">
        <div className="flex flex-col w-full md:max-w-6xl">
            {blogs.map((blog, index) => (
                <BlogCard
                    key={blog.id ?? index} // Ensure blog.id is not undefined
                    id={blog.id ?? 0} // Assuming id is a number, replace 0 with a suitable default value if needed
                    authorName={blog.author?.name ?? "Unknown"} // Use optional chaining to avoid null/undefined error
                    title={blog.title ?? "Untitled"} // Use default value if title is undefined
                    publishedDate="Mar 12, 2024" // Assuming this is a static value for now
                    content={blog.content ?? ""} // Use default value if content is undefined
                />
            ))}
        </div>
    </div>
</div>
);
}

export default Blogs

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500">

  </div>
}