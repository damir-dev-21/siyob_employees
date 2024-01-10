import axios from "axios";
import { AUTH_OVER, AUTH_START } from "./actionType";


function encodeToBase64(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

export function auth(username, password, isLogin) {
    return async (dispatch) => {
        const url = "https://siyobzup.xyz/api/login/"
            // const basicAuth = 'Basic ' + encodeToBase64(username + ':' + password);
            const headers = {
                'Content-Type': 'application/json'
            };
            try {
                const responce = await axios.post(url, JSON.stringify({"username":username,"password":password}),{ headers: headers })
                if (responce.status === 200) {
                    localStorage.setItem('username', username);
                    dispatch(authStart(username, true))
                }
            } catch (error) {
                console.log("authOver");
                dispatch(authOver())
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
