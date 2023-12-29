import React from 'react'

function Navbar() {
  return (
    <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex items-center justify-between">
            {/*  Logo  */}
            <div className="text-white text-lg font-semibold">Logo</div>

            {/*  Mobile Menu Button  */}
            <div className="lg:hidden">
                <button id="menu-toggle" className="text-white focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>

            {/*  Mobile Menu  */}
            <div id="mobile-menu" className="hidden lg:flex lg:items-center lg:w-auto">
                <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                    <li className="nav-item">
                        <a href="#" className="text-white px-3 py-2 hover:underline">Home</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="text-white px-3 py-2 hover:underline">About</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="text-white px-3 py-2 hover:underline">Services</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="text-white px-3 py-2 hover:underline">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar