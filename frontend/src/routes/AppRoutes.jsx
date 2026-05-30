import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import RepoDetails from '../pages/RepoDetails'
import ContributorCommitDetails from '../pages/ContributorCommitDetails'
import RepoPlaceholder from '../components/repo/RepoPlaceholder'

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

          {/* This shows by default when no contributor username is in the URL */}
          <Route index element={<RepoPlaceholder />} />
          <Route
            path='/repo/:owner/:repo/contributor/:username'
            element={<ContributorCommitDetails />}
          />
        </Route>



      </Routes>
    </>
  )
}

export default AppRoutes
