import { ChangeEvent } from "react"

interface labelledInpProps{
  label:string,
  placeholder:string,
  onChange:(e:ChangeEvent<HTMLInputElement>)=>void,
  type?:string,
}
const LabelledInp = ({label,placeholder,onChange,type}:labelledInpProps) => {
  return (
    <div>
        <label className="block mb-2 text-sm font-semibold text-black">{label}</label>
        <input aria-required type={type}  id= {label} className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-3" placeholder={placeholder} required  onChange={onChange}/>
    </div>
  )
}

export default LabelledInp