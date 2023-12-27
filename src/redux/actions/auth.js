import axios from "axios";
import { AUTH_OVER, AUTH_START } from "./actionType";


function encodeToBase64(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

export function auth(username, password, isLogin) {
    return async (dispatch) => {
        const url = "http://web.corp.siyob.uz:9696/ZUP/hs/api/check_user/"


        if (isLogin) {
            

            // Кодирование учетных данных в Base64
            const basicAuth = 'Basic ' + encodeToBase64(username + ':' + password);
            const headers = {
                'Authorization': basicAuth,
            };
            try {
                // const responce = await axios.get(url, { headers: headers })
                // if (responce.status === 200) {
                    localStorage.setItem('username', username);
                    dispatch(authStart(username, true))
                // } 
            } catch (error) {
                console.error("Error during the request:", error);
                dispatch(authStart("", false))
            }
           
            

            
            //dispatch(inLogoutTime(data.expiresIn))
        } else {
            console.log("Ошибка");
            // const responce = await axios.post(url + "/register/", JSON.stringify(newData))
            // const data = responce.data
            // console.log(data);
        }

    }
}

export function authStart(token, isAuth) {
    return {
        type: AUTH_START,
        token,
        isAuth
    }
}

export function inLogoutTime(time) {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(authOver());
        }, time * 1000);
    };
}

export function authOver() {
    return {
        type: AUTH_OVER
    }
}
