"use client"
import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'  
import { GoogleGenAI } from '@google/genai';
import { FaPaperclip } from "react-icons/fa";

const ai = new GoogleGenAI({apiKey: "AIzaSyAZL96CxSBUJaHjm-OufgMEL1KZHmd7Mxw"});


function SearchAyah({
  handleShow}:{
    handleShow:()=>void
  }
 ) {

    
    const [userInput, setUserInput] = useState<string>('')
    const [answer, setAnswer] = useState<string|undefined>('')
    const [loading, setLoading] = useState<boolean>(false)
    const handleSearch = async (e: React.FormEvent) => {
        handleShow()
        setLoading(true)
        e.preventDefault()  
        setUserInput('')
        // Call the API with the question
        const response = ai.models.generateContent({
          model: 'gemini-2.0-flash',
          contents: `Give a list of ayah numbers and content that contain the keyword : "${userInput}". Make your response  small`,
        })
        const data = await response
        console.log("Raw data :", data.text)
        formatAnswer(data.text?data.text:"")

        
        setLoading(false)
    }
    const formatAnswer = (answer: string) => {
      const firstt  = answer.replaceAll("** ","\n")
      const first  = firstt.replaceAll("**","")
      const second  = first.replaceAll("*","\n✅")
      console.log( second)
      setAnswer(second.trim())
    }
      
    return (
    <div className=" flex flex-col ">
      <motion.h1 className="text-2xl font-semibold text-slate-800"
      initial={{opacity:0, x:-10}}
        animate={{opacity:1, x:0}}
        transition={{duration:1}}
      >Search Ayah by keyword</motion.h1>
      <div className='w-full flex justify-center items-center mt-4 flex-col md:flex-row gap-2 '>
        <input
            type="text"
            className='border border-slate-400 rounded-md py-2 px-4 w-96'
            placeholder='Enter keyword...'
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
            autoFocus

            />
        <button 
        disabled={loading}
        onClick={handleSearch} 
        className='bg-sky-400 cursor-pointer  text-white px-4 py-2 rounded-md hover:bg-sky-500 active:bg-sky-600 transition duration-300'>{loading?'Searching...':'Search'}</button>
      </div>
      <div className='w-full grid place-items-center text-xs text-slate-400 '>
        <p className=''><span className='text-red-500'>- </span>Powred by <span className='text-sky-400'>Gemini.</span></p>
      </div>
      {
        answer && (
          <div
            className="w-full md:w-[80%] mx-auto bg-slate-500 border rounded-md px-4 flex flex-col justify-center items-center mt-2"
            
          > 
            <div className='w-full relative mb-2'>
              <FaPaperclip className='absolute top-2 right-0 text-slate-300 hover:text-slate-400 active:text-slate-600 cursor-pointer'
                onClick={() => (
                  navigator.clipboard.writeText(answer)
                )}
              />
            </div>

            <motion.pre
              initial={{opacity:0, x:-10}}
              animate={{opacity:1, x:0}}
              transition={{duration:0.3}}
            className="text-md w-full text-slate-900  pt-4 pb-8 overflow-x-scroll">{answer}</motion.pre>
          </div>)
      }

    </div>
  )
}

export default SearchAyah