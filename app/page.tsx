"use client"
import { motion } from "motion/react";
import SearchAyah from "./components/home/SearchAyah";
import { useState } from "react";
import Concern from "./Concern";

export default function Home() {
  const [dontshow, setDontShow] = useState(false);

  const handleShow = () => {
    setDontShow(true);
  }

  return (
    <main className="px-4 md:px-12">
      {/* Hero section */}
      <section className={`pt-20 flex flex-col items-center justify-center overflow-hidden ${dontshow?'h-0':null}`}>
        <div className="h-full">
          <h1 className="text-3xl font-normal">
            Welcome to <motion.span className="font-bold relative text-sky-400"
              initial={{opacity:0, x:-10}}
              animate={{opacity:1, x:0}}
              transition={{duration:1}}

            >QuraniQ</motion.span>
          </h1>
          <motion.p className="mt-1 text-md text-slate-600"
          initial={{opacity:0, x:-10}}
          animate={{opacity:1, x:0}}
          transition={{duration:1}}
            
          >
            Your AI-based Quran assistant
          </motion.p>
          <motion.div
            className="mt-4 bg-sky-400 text-white px-4 py-2 rounded-md hover:bg-sky-500 transition duration-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get Started
          </motion.div>
        </div>
      </section>

      {/* Features section */}
      <div className="flex flex-col gap-20">
        <Concern/>
        <SearchAyah handleShow={handleShow}/>
      </div>
    </main>
  );
}
