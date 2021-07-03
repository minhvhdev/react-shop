import AxiosClient from "./AxiosClient";

const ProductApi = {
    getAll : function(params){
        const url = '/product/getAll';
        return AxiosClient.get(url, { params });
    },
    getRating: function (params) {
        const url = '/product/getRating';
        return AxiosClient.get(url, { params });
    }
}
export default ProductApi;