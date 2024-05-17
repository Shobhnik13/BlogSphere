import { ChangeEvent } from "react"

const TextEditor = ( {onChange} : {onChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void} ) => {
  return (
    <div className="mt-2">
        <div className="w-full mb-4">
            <div className="flex items-center justify-between border">
                <div className="my-2 bg-white rounnded-b-lg w-full">
                    <label className="sr-only">Publish Blog</label>
                        <textarea onChange={onChange} rows={8} id="editor" className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2" placeholder="Write an article...." required/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TextEditor