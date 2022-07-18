import axios from 'axios';

const token = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user') as string)['token']
  : '';

const getUrl = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    const baseURL = `${process.env.REACT_APP_BACKEND_URL}/api`;
    return baseURL;
  } else {
    const baseURL = '/api';
    return baseURL;
  }
};

const instance = axios.create({
  baseURL: getUrl(),
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default instance;
