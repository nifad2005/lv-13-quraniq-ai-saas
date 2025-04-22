import Link from 'next/link'
import React from 'react'

export default function Page() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-4xl'>404 error</h1>
        <p className='text-2xl'>Page not found</p>
        <Link href={"/"} className='px-2 py-1 bg-blue-500 rounded-2xl'>Go to home</Link>
    </div>
  )
}
