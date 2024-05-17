import { Blog } from "../hooks"
import Avatar from "./Avatar"
import Navbar from "./Navbar"

const SingleBlog = ( {blog} : {blog:Blog}) => {
  return (
    <div>
        <Navbar/>
                <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full max-w-screen-lg pt-12">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Post on 14 feb 2024
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className=" col-span-4">
                    <div className="text-sate-600 text-xl">
                    Author
                    </div>
                    <div className="flex">
                        <div className="pr-4 flex flex-col justify-center">
                        <Avatar name={blog.author.name || "Anonymous"}/>
                        </div>
                        <div>
                        <div className="text-xl font-bold">
                    {blog.author.name || 'Anonymous'}
                    </div>
                    <div className="pt-2 text-slate-500">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum, cumque.
                    </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            </div>
    </div>
  )
}

export default SingleBlog