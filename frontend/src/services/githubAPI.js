import axiosInstance from "./axiosInstance";
import { ENDPOINTS } from "./endpoints";

//get Organization
export const getOrganization = (org) => handleRequest(() => axiosInstance.get(ENDPOINTS.GET_ORG(org)))

//get Teams
export const getTeams = (org) => handleRequest(() => axiosInstance.get(
    ENDPOINTS.GET_TEAMS(org)))

//get Repositories
export const getRepositories = (org) => handleRequest(() => axiosInstance.get(
    ENDPOINTS.GET_REPOS(org)))

//get Pull Requests
export const getPullRequests = (owner, repo) => handleRequest(() => axiosInstance.get(ENDPOINTS.GET_PULLS(owner, repo)))

//get Commits
export const getCommits = (owner, repo) => handleRequest(() => axiosInstance.get(ENDPOINTS.GET_COMMITS(owner, repo)))

