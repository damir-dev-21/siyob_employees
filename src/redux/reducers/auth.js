import { AUTH_OVER, AUTH_START } from "../actions/actionType";

const initialState = {
    isAuth: localStorage.getItem('username')  !== null ? true: null,
    username: localStorage.getItem('username')
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_START:
            return {
                ...state,
                username: action.username,
                isAuth: action.isAuth
            }
        case AUTH_OVER:
            return {
                ...state,
                token: null,
                isAuth: false
            }
        default:
            return state;
    }
}