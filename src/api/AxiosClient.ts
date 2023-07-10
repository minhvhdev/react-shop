import axios from 'axios';
import { REACT_APP_API_URL } from 'constants/global.constant';

const AxiosClient = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json'
  }
});

// Authenticator
// const getToken = () => {
//   const cookie = new Cookie();
//   const token = cookie.get('_token');
//   if (!token) {
//     return null;
//   }
//   return token.accessToken;
// };
//
// AxiosClient.interceptors.request.use((config) => {
//   const token = getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

AxiosClient.interceptors.response.use(
  (response) => {
    if (response && 'data' in response) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export default AxiosClient;
