import AxiosClient from "./AxiosClient";

const axios = require('axios');
const config = {
    method: 'get',
};
const AddressApi = {
    getProvince: function (params) {
        config.url = 'https://raw.githubusercontent.com/minhvhde130134/location-api/main/ghn-province.json';
        // @ts-ignore
        return axios(config);
    },
    getDistrict: function (params) {
        config.url = 'https://online-gateway.ghn.vn/shiip/public-api/master-data/district?' + params;
        config.headers = {
            'token': '84f35a23-6893-11eb-86b9-8a61086fe5fd'
        };
        // @ts-ignore
        return axios(config);
    },
    getWard: function (params) {
        config.url = 'https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?' + params;
        config.headers = {
            'token': '84f35a23-6893-11eb-86b9-8a61086fe5fd'
        };
        // @ts-ignore
        return axios(config);
    },
    getRating: function (params) {
        const url = '/address/getRating';
        return AxiosClient.get(url, { params });
    }
}
export default AddressApi;