export const ENDPOINTS = {
    GET_ORG: (org) => `/orgs/${org}`,
    GET_TEAMS: (org) => `/orgs/${org}/teams`,
    GET_REPOS: (org) => `/orgs/${org}/teams`,
    GET_PULLS: (owner, repo) => `/repos/${owner}/${repo}/pulls?state=closed`,
    GET_COMMITS: (owner, repo) => `/repos/${owner}/${repo}/commits`,
};