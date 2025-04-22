import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <nav className='w-full  px-4 md:px-12 py-4  relative'>
        <Link href='/' className='text-5xl font-semibold '>Qurani<span className='text-sky-400'>Q</span></Link>    
     </nav>
  )
}

export default Navbar   