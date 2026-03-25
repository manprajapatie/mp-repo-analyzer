import axios from "axios"


const axiosInstance = axios.create({
    baseURL: "https://api.github.com",
    headers: {
    Accept: "application/vnd.github+json", //recomended from github
  },
})

axiosInstance.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance