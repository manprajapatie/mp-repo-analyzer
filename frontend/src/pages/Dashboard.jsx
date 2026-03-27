import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { fetchOrg } from '../features/org/orgSlice';
import { fetchRepos } from '../features/repos/repoSlice';
//import { fetchTeams } from '../features/teams/teamSlice';
import { fetchPulls } from '../features/pulls/pullSlice';
import { calculateAnalytics } from '../features/analytics/analyticsSlice';

import StatsCards from "../components/cards/StatsCards"
import RepoTable from "../components/cards/RepoTable"
import DeveloperTable from "../components/tables/DeveloperTable"


const Dashboard = ({ org = "facebook" }) => {
  const dispatch = useDispatch();

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
        <DeveloperTable developers={topDevelopers} />
      </div>
    </>
  )
}

export default Dashboard
