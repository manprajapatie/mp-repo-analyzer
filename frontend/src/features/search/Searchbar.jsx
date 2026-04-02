import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchQuery } from './searchSlice'

const Searchbar = () => {

    const dispatch = useDispatch()

    const [inputValue, setInputValue] = useState("facebook")
    const data = useSelector((state) => state.search)

    //This will handle Submitting Data from input to rtk
    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setSearchQuery(inputValue))
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
