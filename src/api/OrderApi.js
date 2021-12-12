import axiosClient from './AxiosClient';

const OrderApi = {
    checkPromotion: function(params) {
        const url = '/order/checkPromotion';
        return axiosClient.get(url, { params });
    },
    createOrder: function(data) {
        const url = '/order/createOrder';
        return axiosClient.post(url, data);
    },
    checkShippingFee: function(districtID) {
        const axios = require('axios');
        const config = {
            method: 'get',
        };
        config.headers = {
            'token': '84f35a23-6893-11eb-86b9-8a61086fe5fd'
        };
        config.url = 'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee?from_district_id=1785&service_type_id=2&weight=1000&to_district_id=' + districtID;
        // @ts-ignore
        return axios(config);
    },
    getMyOrder: () => {
        // await new Promise(resolve => setTimeout(resolve, 3000));
        const url = '/order/getMyOrder';
        return axiosClient.get(url);
    }
}
export default OrderApi;