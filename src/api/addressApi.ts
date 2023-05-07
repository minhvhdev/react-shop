import {
  GHN_API_URL,
  GHN_TOKEN,
  GITHUB_API_URL
} from "@constants";

const axios = require("axios");
const config = {
  method: "get",
  url: "",
  headers: {},
};

const addressApi = {
  getProvince: function () {
    config.url = `${GITHUB_API_URL}/location-api/main/ghn-province.json`;
    return axios(config);
  },
  getDistrict: function (params: string) {
    config.url = `${GHN_API_URL}/district?` + params;
    config.headers = {
      token: GHN_TOKEN,
    };
    return axios(config);
  },
  getWard: function (params: string) {
    config.url = `${GHN_API_URL}/ward?` + params;
    config.headers = {
      token: GHN_TOKEN,
    };
    return axios(config);
  },
};
export default addressApi;
