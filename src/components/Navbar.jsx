import React from 'react'

const Navbar = () => {
    return (
        <nav className="flex justify-around bg-indigo-900 text-white py-4">
            <div className="logo">
                <span className="font-bold text-xl">iTask</span>
            </div>
            <ul className='flex gap-8'>
                <li><a href="#" className="">Home</a></li>
                <li><a href="#" className="">Your Tasks</a></li>
            </ul>
        </nav>
    )
}

export default Navbar