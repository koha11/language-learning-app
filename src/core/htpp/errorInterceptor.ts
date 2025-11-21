import { httpClient } from './httpClient';

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('Invalid token or expired token');
    }
    console.error(error.response.data);

    return Promise.reject(error);
  },
);
