// export const REACT_APP_API_URL = "http://localhost:8080/api";
// export const API_BASE_URL = 'http://localhost:8080';
// export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/'
export const REACT_APP_API_URL = "https://minhthu.xyz/caphethodung/api";
export const API_BASE_URL = 'https://minhthu.xyz/caphethodung';
export const OAUTH2_REDIRECT_URI = 'https://caphethodung.vn'
export const ACCESS_TOKEN = 'accessToken';
export const VERSION = '4.0';


export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const NOTI = {
    container: "top-center",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    slidingEnter: {
        duration: 250,
    },
    slidingExit: {
        duration: 250,
    },
}