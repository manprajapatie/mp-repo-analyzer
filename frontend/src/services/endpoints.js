export const ENDPOINTS = {
    //get Organization endpoint
    GET_ORG: (org) => `/orgs/${org}`,
    //GET_TEAMS: (org) => `/orgs/${org}/teams`,

    //get repo endpoint
    GET_REPOS: (org) => `/orgs/${org}/repos`,

    //get pull request endpoint
    GET_PULLS: (owner, repo) => `/repos/${owner}/${repo}/pulls?state=closed`,

    //get All branches
    GET_USERDETAILS: (owner, repo, username) => `/repos/${owner}/${repo}/commits?author=${username}`,


    //get language endpoint
    GET_LANGUAGE: (owner, repo) => `/repos/${owner}/${repo}/languages`,

    //get contributors endpoint in perticular repo
    GET_CONTRIBUTORS: (owner, repo) => `/repos/${owner}/${repo}/contributors`,

    //get Commit Details Endpoint
    GET_COMMITDETAILS: (owner, repo, sha) => `/repos/${owner}/${repo}/commits/${sha}`,

    //get Commit endpoint
    GET_COMMITS: (owner, repo) => `/repos/${owner}/${repo}/commits`,
};