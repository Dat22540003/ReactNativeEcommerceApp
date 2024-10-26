import axios from 'axios';
import { API_URI } from '@env'; // Import biến môi trường từ .env
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL: 'http://192.168.137.1:5000/api',
});

// Add a request interceptor
instance.interceptors.request.use(
  async (config) => {
    try {
      // const localStorageData = await AsyncStorage.getItem('persist:shop/user');
      // if (localStorageData) {
      //   const parsedData = JSON.parse(localStorageData);
      //   const accessToken = parsedData?.token;
      const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjJiYzdmZDU5ZGJmNWE1ZjJmMTc2OTciLCJyb2xlIjoiMTk5OSIsImlhdCI6MTcyOTkxMjYyMCwiZXhwIjoxNzMwNTE3NDIwfQ.TthIgMFQwjLF2Ekpx6tgKdGSLd6Cj_pwvfuQEm9WCzE"
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
      // }
    } catch (error) {
      console.error('Error getting access token from AsyncStorage:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error?.response?.data);
  }
);

export default instance;
