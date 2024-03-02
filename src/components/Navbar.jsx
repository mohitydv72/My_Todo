import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between bg-[#4cc5fc]  items-center px-16 py-2'>
        <h1 className='font-bold text-xl font-serif'>Navbar</h1>
      <ul className='flex gap-12 text-lg'>
        <li className='cursor-pointer'>
            <a href="/">Home</a>
        </li>
        <li className='cursor-pointer'>
            <a href="/about">About</a>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
