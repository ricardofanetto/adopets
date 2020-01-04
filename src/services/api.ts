import { StoreKeys } from './../shared/constants';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://test.adopets.app/v1'
});

const token = localStorage.getItem(StoreKeys.TOKEN);

if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;