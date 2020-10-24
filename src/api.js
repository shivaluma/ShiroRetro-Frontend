/* eslint-disable no-param-reassign */
import axios from 'axios';

const instance = axios.create({
  baseURL: `http://35.201.203.222:5000/api/v1/`,
});

instance.interceptors.request.use(
  (config) => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmOTNiOTA0Y2MwYWJmMTlkMDM5MjU4NyIsInVzZXJuYW1lIjoic2hpdmFsdW1hIiwiZGlzcGxheU5hbWUiOiJzaGl2YWx1bWEiLCJpYXQiOjE2MDM1MTY2ODF9.omnezGwWS6drn4wGFBPjjV6__yheMpZ3B4uJLXyAvb8';
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
