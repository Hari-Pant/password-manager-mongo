import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-purple-200 text-black '>
        <div className='p-4 md:px-30 flex justify-between items-center'>

        <div className="logo">
            <h1 className='text-2xl font-bold'>
                <span className="text-green-700">&lt;</span>
            Pass
            <span className="text-green-700">MGR/&gt;</span>
            </h1>
        </div>
        <ul>
            <li className='flex space-x-8'>
                <a className='hover:font-bold' href="/">Home</a>
                <a className='hover:font-bold' href="/about">About</a>
                <a className='hover:font-bold' href="/contact">Contact</a>
            </li>
        </ul>
        </div>
    </nav>
  )
}

export default Navbar