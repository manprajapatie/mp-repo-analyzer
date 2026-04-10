import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'

const AppRoutes = () => {
  return (
    <>

      <Routes>
        {/* Landing Page */}
        <Route
          path='/'
          element={<Home />}
        />

        {/* Org Dashboard (dynamic) */}
        <Route
          path='/org/:orgName'
          element={<Dashboard />}
        />

        {/* Repo Detail (dynamic) */}
        <Route
          path='/repo/:owner/:repo'
          element={<Dashboard />}
        />

      </Routes>
    </>
  )
}

export default AppRoutes
