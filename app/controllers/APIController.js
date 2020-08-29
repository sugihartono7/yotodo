import jwtDecode from "jwt-decode";
import axios from "axios/index";
import {
    Controller
} from "./Controller";

export const APIController = {
    url_API: {
        login: () => {
            let url = Controller.env().API_URL + 'api/v1/user/auth/login';

            return url;
        },
        requestJWT: () => {
            let url = Controller.env().API_URL + 'api/v1/token/request';

            return url;
        },
        customURL: (segmentUrl) => {
            let otherUrl = segmentUrl;
            let url = Controller.env().API_URL + 'api/v1/' + otherUrl;
            
            return url;
        },
    },

    request_API: {
        isTokenValid: (token, loggedUserId) => {
            try {
                //Validasi 2 lapis :
                //1. Cek dulu token itu punya user bersangkutan bukan
                //2. Cek lagi apakah token tersebut sudah expired atau belum
                if (token != null) {
                    let jwtDecoded = jwtDecode(token);
                    let userIdJWT = jwtDecoded.data;
                    let currenTime = (Date.now() / 1000) - 10; //Date.now() hasilnya dalam milisekon, dikurang 10 detik untuk kasih spare waktu request ulang / renew JWT
                    let expTime = jwtDecoded.exp;

                    console.log("Jam HP : " + currenTime + " VS JWT EXP : " + expTime);
                    console.log(jwtDecoded);

                    if (loggedUserId != userIdJWT) {
                        console.log("Request Token 1");
                        console.log("idjwt="+userIdJWT);
                        console.log("idlogin="+loggedUserId);
                        return false;
                    } else {
                        if (expTime < currenTime) {
                            //JWT expired
                            console.log("Request Token 2");
                            return false;
                        } else {
                            console.log("Token Masih Valid");
                            return true;
                        }
                    }
                } else {
                    console.log("Request Token 3");
                    return false;
                }
            } catch (error) {
                console.error(error);

                return false;
            }
        },
        requestToken: async (userId, password, userIP) => {
            try {
                let formData = new FormData();

                formData.append("user_id", userId);
                formData.append("password", password);
                formData.append("username_jwt", Controller.env().API_AUTH.USERNAME_JWT);
                formData.append("password_jwt", Controller.env().API_AUTH.PASSWORD_JWT);

                // console.log('userid-'+userId);
                // console.log('pass-'+password);
                // console.log('userjwt-'+Controller.env().API_AUTH.USERNAME_JWT);
                // console.log('passjwt-'+Controller.env().API_AUTH.PASSWORD_JWT);

                let response = await axios({
                    method: 'POST',
                    url: APIController.url_API.requestJWT(),
                    responseType: 'json',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'ip': userIP,
                        'origin': Controller.env().ORIGIN,
                        'source': Controller.env().SOURCE
                    },
                    timeout: Controller.env().TIMER.FETCH_TIMEOUT,
                    data: formData
                });

                let responseJson = response.data;

                console.log("HASIL requestToken : " + responseJson);
                return responseJson;
            } catch (error) {
                return error;
            }
        },
        requestAPIWithoutToken: async (ip, url, formData, method) => {
            if (method === 'POST') {
                if (formData == null) {
                    formData = new FormData();
                }

                let response = await axios({
                    method: method,
                    url: url,
                    responseType: 'json',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'ip': ip,
                        'origin': Controller.env().ORIGIN,
                        'source': Controller.env().SOURCE
                    },
                    timeout: Controller.env().TIMER.FETCH_TIMEOUT,
                    data: formData
                }).catch(error => console.log(error));

                let responseJson = response.data;

                return responseJson;
            } else if (method === 'GET') {
                let response = await axios({
                    method: method,
                    url: url,
                    responseType: 'json',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'ip': ip,
                        'origin': Controller.env().ORIGIN,
                        'source': Controller.env().SOURCE
                    },
                    timeout: Controller.env().TIMER.FETCH_TIMEOUT
                });

                let responseJson = response.data;

                return responseJson;
            } else {

            }
        },
        requestAPIWithToken: async (ip, url, formData, method) => {
            let currentToken = await Controller.asyncStorage.getValueOneKeyAsyncStorage({'key': 'token_user'});
            let currentUserId = await Controller.asyncStorage.getValueOneKeyAsyncStorage({'key': 'token_user_id'});
            let currentUserPassword = await Controller.asyncStorage.getValueOneKeyAsyncStorage({'key': 'token_password'});
            //console.log('requestAPIWithToken curtoken '+currentToken.value);
            //console.log('requestAPIWithToken cur userid '+currentUserId.value);
            //console.log('requestAPIWithToken cur pass '+currentUserPassword.value);

            if (currentToken != null && currentUserId != null && currentUserPassword != null) {
                let isValid = await APIController.request_API.isTokenValid(currentToken.value, currentUserId.value);

                if (!isValid) {
                    console.log("Token Invalid (Request API with Token)");
                    temp_token = await APIController.request_API.requestToken(currentUserId.value, currentUserPassword.value, ip);
                    
                    let initialAsyncStorage = [
                        {
                            'key': 'token_user',
                            'value': temp_token.data.token.toString(),
                        }
                    ];
                    await Controller.asyncStorage.setAsyncStorage(initialAsyncStorage);
                    currentToken = temp_token.data.token;
                }

                if (method === 'POST') {
                    if (formData == null) {
                        formData = new FormData();
                    }

                    try {
                        let response = await axios({
                            method: method,
                            url: url,
                            responseType: 'json',
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'Authorization': 'Bearer ' + currentToken.toString(),
                                'ip': ip,
                                'origin': Controller.env().ORIGIN,
                                'source': Controller.env().SOURCE
                            },
                            timeout: Controller.env().TIMER.FETCH_TIMEOUT,
                            data: formData
                        });

                        //console.log('RESPONSE:', response);
                        
                        let responseJson = response.data;

                        return responseJson;
                    } catch (err) {
                        throw err;
                    }
                } 
                else if (method === 'GET') {
                    let response = await axios({
                        method: method,
                        url: url,
                        responseType: 'json',
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': 'Bearer ' + currentToken.value,
                            'ip': ip,
                            'origin': Controller.env().ORIGIN,
                            'source': Controller.env().SOURCE
                        },
                        timeout: Controller.env().TIMER.FETCH_TIMEOUT
                    });

                    let responseJson = response.data;
                    return responseJson;
                } else {

                }
            }
            else {
                return null;
            }
        },
        requestCoba: async (method) => {
            if (method === 'GET') {
                let response = await axios({
                    method: method,
                    url: 'https://demo3042117.mockable.io/getDataProfile.json',
                    responseType: 'json',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    timeout: Controller.env().TIMER.FETCH_TIMEOUT
                });

                let responseJson = response.data;

                return responseJson;
            } else {

            }
        }
    },
};