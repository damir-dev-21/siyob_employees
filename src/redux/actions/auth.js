import axios from "axios";
import { AUTH_OVER, AUTH_START } from "./actionType";

export function auth(username, password, isLogin) {
    return async (dispatch) => {
        const url = "http://web.corp.siyob.uz:9696/ZUP/hs/api/check_user/"


        if (isLogin) {
            

            // Кодирование учетных данных в Base64
            const basicAuth = 'Basic ' + btoa(username + ':' + password);
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': basicAuth,
                'Access-Control-Allow-Origin':true
                // Другие заголовки при необходимости
            };
            const responce = await axios.get(url, { headers: headers })
            const data = responce.data
            console.log(responce.status);
            localStorage.setItem('username', username);

            dispatch(authStart(username, true))
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
