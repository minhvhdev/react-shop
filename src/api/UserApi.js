import axiosClient from "./AxiosClient";

const UserApi = {
    login : function(data){
        const url = '/user/login';
        return axiosClient.post(url, data);
    }
}
export default UserApi;