import AxiosClient from "./AxiosClient";

const PostApi = {
    getAll: function (params) {
        const url = '/post/getAll';
        return AxiosClient.get(url);
    }
}
export default PostApi;