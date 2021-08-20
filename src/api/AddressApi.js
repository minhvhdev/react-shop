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
    getAll: function () {
        const url = '/user/getAddress';
        return AxiosClient.get(url);
    },
    saveAddress: function (data){
        const url = '/user/saveAddress';
        return AxiosClient.post(url,data)
    },
    removeAddress: function (params){
        const url = '/user/removeAddress';
        return AxiosClient.get(url,{params})
    },
    setDefault: function (params){
        const url = '/user/setAddressDefault';
        return AxiosClient.get(url,{params})
    },
    socialAsyncAddress:  function () {
        // await new Promise(resolve => setTimeout(resolve, 3000));
        const url = '/user/socialAsyncAddress';
        return AxiosClient.get(url);
    }
}
export default AddressApi;