import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<Dashboard />}
        />
        <Route
          path='/home'
          element={<Home />}
        />
      </Routes>
    </>
  )
}

export default AppRoutes
