import { Link } from "react-router-dom"
import Avatar from "./Avatar"

interface BlogCardProps{
    title:string,
    content:string,
    authorName:string,
    publishedDate:string,
    id:string,
}


const BlogCard = ({title,content,authorName,publishedDate,id}:BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
    <div className="border-b border-slate-200 pb-4 p-4 cursor-pointer w-screen max-w-screen-md">
        <div className="flex items-center">
            <div className="flex justify-center flex-col">
                <Avatar name={authorName} />
            </div>
            <div className="font-extralight pl-2 text-sm">{authorName}</div>
            <div className="pl-2 font-thin text-slate-400 text-sm">{publishedDate}</div>
        </div>

        <div className="text-xl font-semibold pt-2">{title}</div>

        <div className="text-md font-thin pt-2">{content.slice(0,100) + "..."}</div>
    </div>
    </Link>
  )
}

export default BlogCard