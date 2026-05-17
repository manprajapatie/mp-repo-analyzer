import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchQuery } from './searchSlice'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react"
import { Search } from 'lucide-react'

const Searchbar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [inputValue, setInputValue] = useState("facebook")
    const data = useSelector((state) => state.search)

    //This will handle Submitting Data from input to rtk
    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setSearchQuery(inputValue))

        // navigate to org
        navigate(`/org/${inputValue}`);
    }

    return (

        <>
            <form onSubmit={handleSearch} className="relative flex items-center w-full">
                <label className='w-full block'>
                    <input type="text"
                        value={inputValue ?? "facebook"}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Enter Organization"
                        className="w-full  rounded-full border border-slate-700 bg-slate-800/50 py-1.5 pl-4 pr-12 text-sm text-slate-200 placeholder-slate-400 focus:border-indigo-500 focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                    />
                </label>
                {/* Animated Submit Button inside the input bar */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-indigo-600 p-1.5 text-white hover:bg-indigo-500 focus:outline-none  "
                >
                    {/*Search Icon */}
                    <Search size={20}/>
                </motion.button>
            </form>



            {/* For Data Checking
            <h2>
                {`This is data ${data.query}`}
            </h2> */}

        </>
    )
}

export default Searchbar
