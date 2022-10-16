// Import actionType constants
import {
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT_SUCCESS,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    NO_ERROR
} from '../constants/actionType';
import history from '../utils/history';
import { signup, signin } from '../services/authService';

export const loginSuccess = (data) => {
    return {
        type: LOG_IN_SUCCESS,
        data
    };
};

export const loginFailure = (error) => {
    return {
        type: LOG_IN_FAILURE,
        error
    };
};

export const logoutSuccess = () => {
    return {
        type: LOG_OUT_SUCCESS
    };
};

export const signupSuccess = () => {
    history.goBack();
    
    return {
        type: SIGN_UP_SUCCESS
    };
};

export const signupFailure = (error) => {
    return {
        type: SIGN_UP_FAILURE,
        error
    };
};

export const login = ({ email, password }) => {
    return dispatch => {
        dispatch(signin({ email, password }));
    };
};

export const submitSignupForm = (data) => {
    return dispatch => {
        dispatch(signup(data));
    };
};

export const setNoError = () => {
    return {
        type: NO_ERROR,
    };
};