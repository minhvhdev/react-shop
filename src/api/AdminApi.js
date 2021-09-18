import AxiosClient from "./AxiosClient";

const AdminApi = {
    getPendingOrder: function () {
        const url = '/admin/getPendingOrder';
        return AxiosClient.get(url);
    },
    getOrderDetail: function (params) {
        const url = '/admin/getOrderDetail';
        return AxiosClient.get(url,{params});
    },
    getShippingOrder: function () {
        const url = '/admin/getShippingOrder';
        return AxiosClient.get(url);
    },
    getAllOrder: function () {
        const url = '/admin/getAllOrder';
        return AxiosClient.get(url);
    },
    acceptOrder: function (params) {
        const url = '/admin/acceptOrder';
        return AxiosClient.get(url,{params});
    },
    rejectOrder: function (params) {
        const url = '/admin/rejectOrder';
        return AxiosClient.get(url,{params});
    },
    cancelOrder: function (params) {
        const url = '/admin/cancelOrder';
        return AxiosClient.get(url,{params});
    },
    successOrder: function (params) {
        const url = '/admin/successOrder';
        return AxiosClient.get(url,{params});
    },
    getAllPromotion: function (params) {
        const url = '/admin/getAllPromotion';
        return AxiosClient.get(url,{params});
    },
    removePromotion: function (params) {
        const url = '/admin/removePromotion';
        return AxiosClient.get(url,{params});
    },
    createPromotion: function (data) {
        const url = '/admin/createPromotion';
        return AxiosClient.post(url,data);
    },
    
}
export default AdminApi;