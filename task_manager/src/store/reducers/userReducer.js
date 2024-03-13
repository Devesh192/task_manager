// reducers/userReducer.js

import { REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE, LOGIN_USER, LOGOUT_USER } from '../actionType';
const initialState = {
    user: null,
    error: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload,
            };
        case LOGOUT_USER:
            return {
                ...state,
                user: null,
            };
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                error: null,
            };
        case REGISTER_USER_FAILURE:
            return {
                ...state,
                user: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
