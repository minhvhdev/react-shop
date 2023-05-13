import { GHN_API_URL, GHN_TOKEN, GITHUB_API_URL } from '@constants';
import { IAddressDistrict, IAddressWard } from '@types';
import { AxiosHeaders, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';

const config: AxiosRequestConfig = {
  method: 'get',
  url: '',
  headers: new AxiosHeaders()
};

interface Response<T> {
  data: T;
}

const addressApi = {
  getProvince: () => {
    config.url = `${GITHUB_API_URL}/location-api/main/ghn-province.json`;
    return axios(config);
  },
  getDistrict: (params: string): Promise<AxiosResponse<Response<IAddressDistrict[]>>> => {
    config.url = `${GHN_API_URL}/district?` + params;
    config.headers = {
      token: GHN_TOKEN
    };
    return axios(config);
  },
  getWard: (params: string): Promise<AxiosResponse<Response<IAddressWard[]>>> => {
    config.url = `${GHN_API_URL}/ward?` + params;
    config.headers = {
      token: GHN_TOKEN
    };
    return axios(config);
  }
};
export default addressApi;
