import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Searchbar from '../../features/search/Searchbar'

const Header = () => {

  const data = useSelector((state) => state.search)
  return (
    <>
      <h1>
        This is Header
      </h1>
      <Searchbar />
    </>
  )
}

export default Header
