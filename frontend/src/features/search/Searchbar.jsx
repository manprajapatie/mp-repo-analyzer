import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchQuery } from './searchSlice'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react"

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
            // Search for Organization
            <form onSubmit={handleSearch}>
                <label>
                    <input type="text"
                        value={inputValue ?? "facebook"}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Enter Organization"
                    />
                </label>
                <button type='submit'>
                    Sumbit
                </button>
            </form>

            <form action="">

            </form>

            {/* For Data Checking */}
            <h2>
                {`This is data ${data.query}`}
            </h2>

        </>
    )
}

export default Searchbar
