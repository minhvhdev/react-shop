import axiosClient from "./AxiosClient";

const UserApi = {
    login: function (data) {
        const url = '/user/login';
        return axiosClient.post(url, data);
    },
    changePassword: function (data) {
        // await new Promise(resolve => setTimeout(resolve, 3000));
        const url = '/user/changePassword';
        return axiosClient.post(url, data);
    },
    updateInfo: function (params) {
        const url = '/user/updateInfo';
        return axiosClient.get(url, { params });
    },
    updateEmail: function (params) {
        const url = '/user/updateEmail';
        return axiosClient.get(url, { params });
    },
    signup: function (data) {
        const url = '/user/signup';
        return axiosClient.post(url, data);
    },
    getUserInfo: function () {
        const url = '/user/getUserInfo';
        return axiosClient.get(url);
    },
    sendVerify: function () {
        const url = '/user/sendVerify';
        return axiosClient.get(url);
    },
    verify: function (params) {
        const url = '/user/verify';
        return axiosClient.get(url, { params });
    },
    forgetPassword: (params) => {
        const url = '/user/forgetPassword';
        return axiosClient.get(url, { params });
    },
    forgetChangePassword: (data) => {
        const url = '/user/forgetChangePassword';
        return axiosClient.post(url, data);
    },
}
export default UserApi;