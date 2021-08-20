import axios from 'axios';
import { REACT_APP_API_URL } from 'constants/index';
import queryString from 'query-string';
import Cookie from 'universal-cookie';


export const getToken = () => {
    const cookie = new Cookie();
    const token = cookie.get('_token');
    if (!token) {
        return null;
    }
    return token.accessToken;
}
const AxiosClient = axios.create({
    baseURL: REACT_APP_API_URL,
    // @ts-ignore
    header: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
})

AxiosClient.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

AxiosClient.interceptors.response.use((response) => {
    if (response && 'data' in response) {
        return response.data
    }
    return response;
}, (error) => {
    //handle errors
    throw error;
})

export default AxiosClient;