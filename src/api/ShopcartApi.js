import axiosClient from "./AxiosClient";

const ShopcartApi = {
    addToCart :  function(params){
        const url = '/product/addToCart';
        return axiosClient.get(url, {params});
    },
    removeCartItem : function(params){
        // await new Promise(resolve => setTimeout(resolve, 3000));
        const url = '/product/removeCartItem';
        return axiosClient.get(url, {params});
    },
    asyncCart : function(data){
        // await new Promise(resolve => setTimeout(resolve, 3000));
        const url = '/product/asyncCart';
        return axiosClient.post(url, data);
    },
    updateCart : function(data){
        const url = '/product/updateCart';
        return axiosClient.post(url, data);
    },
    socialAsyncCart:  function () {
        // await new Promise(resolve => setTimeout(resolve, 3000));
        const url = '/user/socialAsyncCart';
        return axiosClient.get(url);
    }
}
export default ShopcartApi;