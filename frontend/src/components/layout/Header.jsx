import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Searchbar from '../../features/search/Searchbar'
import { useLocation, Link } from 'react-router-dom'
import { motion } from "motion/react"
import logo from "../../assets/logo/mpRepoAnalyzer.png"

const Header = () => {

  const data = useSelector((state) => state.search)

  // Get the current route location
  const location = useLocation()

  //Check if the current path is exactly the root route
  const isHomeRoute = location.pathname === '/'

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 z-50 w-full border-b border-slate-800 bg-slate-900/70 backdrop-blur-md flex sm:py-3 py-1 md:px-10 px-4 justify-between"
      >
        {/* Logo  */}
        <div className="flex items-center gap-2 cursor-pointer">

          {/* When user Click on logo, they will redirect to home page */}
          <Link to="/" >
            <img src={logo} alt="MRP" className='h-11' />
          </Link>
        </div>

        {/* Searchbar */}

        {isHomeRoute ? (
          //This displays ONLY on the Home Route (/)
          <div className='flex md:w-96 sm:w-72 justify-end md:justify-center max-w-md ml-4 border-solid border-2 text-white '>
            We Analyzer Perfomance
          </div>
        ) : (
          // 2. This displays on ALL OTHER routes
          <div className="flex md:w-96 sm:w-72 justify-end md:justify-center max-w-md ml-4 border-solid border-2 ">
            <Searchbar />
          </div>
        )}


        {/* --- GLOWING TRAVELING BOTTOM LINE --- */}
        <div className="absolute bottom-0 left-0 h-0.5 w-full overflow-hidden">
          <div
            className="w-[200%] h-full opacity-90"
            style={{
              background: 'linear-gradient(to right, transparent, #818cf8, #34d399, #22d3ee, transparent, #818cf8)',
              animation: 'travel 10s linear infinite',
            }}
          />
        </div>
      </motion.header>
    </>
  )
}

export default Header
