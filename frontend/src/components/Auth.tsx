import { Link, useNavigate } from "react-router-dom"
import LabelledInp from "./LabelledInp"
import { useState } from "react"
import { SignupInput } from "@shobhnik13/zod_types"
import axios from "axios"

interface authProps{
    type:string
}

const Auth = ({type}:authProps) => {
    const [postInp,setpPostInp]=useState<SignupInput>({
        email:"",
        password:"",
        name:"",
    })
    const navigate=useNavigate()
    const sendRequest=async()=>{
        try{
            const res = await axios.post('https://news-app.shobhnikw.workers.dev/api/v1/users/signup',postInp)
            const jwt=res.data
            localStorage.setItem("token",jwt)
            navigate('/blogs')
        }catch(e){
            console.log('error');
        }
    }
    // console.log(postInp);
    
  return (
    <div className="flex justify-center flex-col h-screen">
        <div className="flex justify-center">
            <div>
            <div className="px-10">
                <div className="text-3xl font-extrabold">Create an account</div>
                <div className="text-slate-400">
                    Already have an account?
                    <Link to={'/signin'} className="pl-2 underline">Sign in</Link>
                </div>
            </div>
            <div className="flex flex-col gap-y-4 mt-4">
            <LabelledInp type="text" placeholder="John Doe..." label="Name" onChange={(e)=>{setpPostInp({
                ...postInp,
                name:e.target.value
            })}}/>
            
            <LabelledInp type="email" placeholder="johndoe12@gmail.com" label="Email" onChange={(e)=>{setpPostInp({
                ...postInp,
                email:e.target.value
            })}}/>

            <LabelledInp type="password" placeholder="Your secret" label="Password" onChange={(e)=>{setpPostInp({
                ...postInp,
                password:e.target.value
            })}}/>
            <button onClick={sendRequest} type="button" className="text-white bg-gray-900 hover:bg-gray-700 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-md w-full px-5 py-3 mt-4 mb-4">Sign up</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Auth