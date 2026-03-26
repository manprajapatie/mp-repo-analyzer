import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import { fetchOrg } from '../features/org/orgSlice';
import { fetchRepos } from '../features/repos/repoSlice';
import { fetchTeams } from '../features/teams/teamSlice';
import { fetchPulls } from '../features/pulls/pullSlice';
import { calculateAnalytics } from '../features/analytics/analyticsSlice';


const Dashboard = () => {
  return (
    <>
      
    </>
  )
}

export default Dashboard
