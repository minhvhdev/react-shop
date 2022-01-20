import AxiosClient from "./AxiosClient";

const ProductApi = {
    getAll: function(params) {
        const url = '/product/getAll';
        return AxiosClient.get(url, { params });
    },
    getRating: function(params) {
        const url = '/product/getRating';
        return AxiosClient.get(url, { params });
    },
    checkLiked: function(params) {
        const url = '/product/checkLiked';
        return AxiosClient.get(url, { params });
    },
    updateLike: function(params) {
        const url = '/product/updateLike';
        return AxiosClient.get(url, { params });
    },
    getLiked: function() {
        const url = '/product/getLiked';
        return AxiosClient.get(url);
    }
}
export default ProductApi;