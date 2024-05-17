import { useState } from "react"
import Navbar from "../components/Navbar"
import TextEditor from "../components/TextEditor"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Publish = () => {
    const navigate=useNavigate()
    const [title,setTitle]=useState('')
    const [content,setContent]=useState("")
    console.log(title,content);
    
    const handleSubmit=async()=>{
            const res=await axios.post('https://news-app.shobhnikw.workers.dev/api/v1/blogs/create',{
                title,
                content
            },{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            })
            navigate(`/blog/${res.data.id}`)
    }
  return (
    <div className="">
        <Navbar/>
        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg w-full">
                <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title"/>
               <TextEditor onChange={(e)=>setContent(e.target.value)}/>
               <button type="submit" onClick={handleSubmit} className=" inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 ">Publish Blog</button>
            </div>
        </div>
    </div>
  )
}

export default Publish