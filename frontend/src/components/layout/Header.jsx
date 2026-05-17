import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Searchbar from '../../features/search/Searchbar'
import { motion } from "motion/react"

const Header = () => {

  const data = useSelector((state) => state.search)
  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/70 backdrop-blur-md flex sm:py-3 py-1 md:px-10 px-4 justify-between"
      >
        {/* Logo  */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold ">
            MPR
          </span>
        </div>

        {/* Searchbar */}
        <div className="flex md:w-96 sm:w-72 justify-end md:justify-center max-w-md ml-4 border-solid border-2 ">
          <Searchbar />
        </div>

      </motion.header>
    </>
  )
}

export default Header
