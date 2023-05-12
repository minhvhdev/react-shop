import { IOrder } from '@types';
import axios from 'axios';
import axiosClient from './AxiosClient';

const orderApi = {
  checkShippingFee: function (districtID: string | number) {
    const config: axios.AxiosRequestConfig<any> = {
      method: 'get'
    };
    config.headers = {
      token: '84f35a23-6893-11eb-86b9-8a61086fe5fd'
    };
    config.url =
      'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee?from_district_id=1785&service_type_id=2&weight=1000&to_district_id=' +
      districtID;
    return axios(config);
  }
};
export default orderApi;
