import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';

const baseURL = '/';

let authTokens = localStorage.getItem('authTokens')
  ? JSON.parse(localStorage.getItem('authTokens'))
  : null;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: authTokens ? `Bearer ${authTokens.access}` : null,
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  authTokens = localStorage.getItem('authTokens')
    ? JSON.parse(localStorage.getItem('authTokens'))
    : null;

  if (!authTokens) {
    delete req.headers.Authorization;
    return req;
  }

  const user = jwtDecode(authTokens.access);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpired) {
    req.headers.Authorization = `Bearer ${authTokens.access}`;
    return req;
  }

  try {
    const response = await axios.post('/api/token/refresh/', {
      refresh: authTokens.refresh,
    });

    localStorage.setItem('authTokens', JSON.stringify(response.data));

    req.headers.Authorization = `Bearer ${response.data.access}`;
    return req;

  } catch (error) {
    console.error('Token refresh failed', error);
    return req;
  }
});

export default axiosInstance;