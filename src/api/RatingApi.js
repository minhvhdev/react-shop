import AxiosClient from "./AxiosClient";

const RatingApi = {
    getRate: function (params) {
        const url = '/rate/getRate';
        return AxiosClient.get(url, { params });
    },
    rating: function (params){
        const url ='/rate/rating';
        return AxiosClient.get(url,{params});
    }
}
export default RatingApi;