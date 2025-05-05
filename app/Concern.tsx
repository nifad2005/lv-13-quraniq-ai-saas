"use client"
import motion from "motion/react"
import React, { useState } from "react"
import { ai } from "./components/home/SearchAyah"
import { FaPaperclip } from "react-icons/fa6"

function Concern() {

     const [userInput, setUserInput] = useState<string>('')
    const [answer, setAnswer] = useState<string|undefined>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [placeholder, setPlaceholder] = useState<string>("Write your feelings...")
    const handleSearch = async (e: React.FormEvent) => {

        setLoading(true)
        e.preventDefault()  
        setUserInput('')
        setPlaceholder("Wait some time...")
        // Call the API with the question
        const response = ai.models.generateContent({
          model: 'gemini-2.0-flash',
          contents: `give solution according to Quran with Ayah for my concern, make your response sort , my concern is :${userInput}`,
        })
        const data = await response
        console.log("Raw data :", data.text)
        // formatAnswer(data.text?data.text:"")
        setAnswer(data.text?data.text:"")
        setPlaceholder(`Solution for - ${userInput}`)
        
        setLoading(false)
    }
    // const formatAnswer = (answer: string) => {
    //   const firstt  = answer.replaceAll("** ","\n")
    //   const first  = firstt.replaceAll("**","")
    //   const second  = first.replaceAll("*","\n✅")
    //   console.log( second)
    //   setAnswer(second.trim())
    // }
      
  return (

        <div className=" flex flex-col min-h-[300px] mt-12 ">
      <h1 className="text-2xl font-semibold text-slate-800"
      >
        Solution for your concern.
      </h1>
      <div className='w-full flex justify-center items-center mt-4 flex-col md:flex-row gap-2  '>
        <input
            type="text"
            className='border focus:outline-sky-500 focus:shadow-sky-300/90  rounded-md py-2 px-4 w-96 shadow-lg shadow-sky-300/40'
            placeholder={`${placeholder}`}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
            autoFocus

            />
        <button 
        disabled={loading}
        onClick={handleSearch} 
        className={`bg-sky-400 cursor-pointer  shadow-lg  text-white px-4 py-2 rounded-md hover:bg-sky-500 active:bg-sky-600 transition duration-300 ${loading?"shadow-sky-500/90":"shadow-sky-500/60"}`}>{loading?'Searching...':'Search'}</button>
      </div>
      <div className='w-full grid place-items-center text-xs text-slate-400 '>
        <p className=''><span className='text-red-500'>- </span>Powred by <span className='text-sky-400'>Gemini.</span></p>
      </div>
      {
        answer && (
          <div
            className="w-full md:w-[80%]  mx-auto bg-slate-500 border rounded-md px-4 flex flex-col justify-center items-center mt-2"
            
          > 
            <div className='w-full relative mb-2'>
              <FaPaperclip className='absolute top-2 right-0 text-slate-300 hover:text-slate-400 active:text-slate-600 cursor-pointer'
                onClick={() => (
                  navigator.clipboard.writeText(answer)
                )}
              />
            </div>

            <pre
             
            className="text-md w-full text-slate-900  pt-4 text  break-words whitespace-pre-wrap pb-12">{answer}</pre>
          </div>)
      }

    </div>
    
  )
}

export default Concern  