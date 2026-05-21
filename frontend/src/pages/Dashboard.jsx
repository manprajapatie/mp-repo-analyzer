import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { fetchOrg } from '../features/org/orgSlice';
import { fetchRepos } from '../features/repos/repoSlice';
//import { fetchTeams } from '../features/teams/teamSlice';
import { fetchPulls } from '../features/pulls/pullSlice';
import { calculateAnalytics } from '../features/analytics/analyticsSlice';
//import { search } from '../features/search/searchSlice'

import StatsCards from "../components/cards/StatsCards"
import RepoTable from "../components/cards/RepoTable"
import DeveloperTable from "../components/tables/DeveloperTable"


const Dashboard = () => {
  const dispatch = useDispatch();


  const orgFromSearch = useSelector((state) => state.search)

  //if orgFromSearch have data(that name in reducer query) show it otherwise show default value
  const org = orgFromSearch?.query || "facebook";

  const { data: orgData } = useSelector((state) => state.org);
  const { list: repos } = useSelector((state) => state.repos);
  //const { list: teams } = useSelector((state) => state.teams);
  const { list: pulls } = useSelector((state) => state.pulls);
  const { prVelocity, topDevelopers } = useSelector(
    (state) => state.analytics
  );

  useEffect(() => {
    dispatch(fetchOrg(org));
    dispatch(fetchRepos(org));
    //dispatch(fetchTeams(org));
  }, [org]);

  useEffect(() => {
    if (repos.length > 0) {
      // fetch pulls for first repo (also others)
      dispatch(fetchPulls({ owner: org, repo: repos[0].name }));
    }
  }, [repos]);

  useEffect(() => {
    if (pulls.length > 0) {
      dispatch(calculateAnalytics({ pulls }));
    }
  }, [pulls]);

  return (
    <>
      <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200 pt-20">

        {/* Header Block / Welcome Slate */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-900 mx-7">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-50">
              {orgData?.name || orgData?.login || org.charAt(0).toUpperCase() + org.slice(1)} Dashboard
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Real-time contribution pipelines, repository metrics, and branch health analytics.
            </p>
          </div>

          {orgData?.avatar_url && (
            <div className="flex items-center gap-3 bg-slate-900/30 border border-slate-900 px-4 py-2 rounded-xl backdrop-blur-sm self-start sm:self-center">
              <img
                src={orgData.avatar_url}
                alt={orgData.login}
                className="w-7 h-7 rounded-lg border border-slate-800"
              />
              <span className="text-xs font-mono text-slate-400">@{orgData.login}</span>
            </div>
          )}
        </div>

        {/* Data Section */}
        <div className="p-6 space-y-6">
          {/* Stats */}
          <StatsCards
            org={orgData}
            repos={repos}
            //teams={teams}
            prVelocity={prVelocity}
          />

          {/* Repo Table */}
          <RepoTable repos={repos} />

          {/* Developer performance */}
          {/* <DeveloperTable developers={topDevelopers} /> */}
        </div>
      </div>
    </>
  )
}

export default Dashboard
