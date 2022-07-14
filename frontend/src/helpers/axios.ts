import axios from 'axios';

const token = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user') as string)['token']
  : '';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default instance;
