import axios from "axios";
import { AUTH_OVER, AUTH_START } from "./actionType";

export function auth(username, password, isLogin) {
    return async (dispatch) => {
        // const url = "http://127.0.0.1:8000/api"

        let newData = {
            username,
            password
        }

        // const expirationDate = new Date(new Date().getTime() + new Date().getDate() * 1000);

        console.log(isLogin);
        if (isLogin) {
            newData = {
                username,
                password
            }
            // const responce = await axios.post(url + "/login/", newData)
            // const data = responce.data
            console.log(newData);
            localStorage.setItem('username', newData.username);

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
