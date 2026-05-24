import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import RepoDetails from '../pages/RepoDetails'
import ContributorDetails from '../pages/ContributorDetails'

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
          element={<RepoDetails />}
        >
          {/* NestedContributor Detail (dynamic) */}
          <Route
            path='/repo/:owner/:repo/contributor/:username'
            element={<ContributorDetails />}
          />
        </Route>



      </Routes>
    </>
  )
}

export default AppRoutes
