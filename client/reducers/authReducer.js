// Import custom components
import {
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE, 
    LOG_OUT_SUCCESS,
    SIGN_UP_FAILURE,
    NO_ERROR
} from '../constants/actionType';

var initialState = {
    token: null,
    isAuthenticated: false,
    isLoading: false
};

/**
 * A reducer takes two arguments, the current state and an action.
 */
const authReducer = (state, action) => {
    state = state || initialState;

    console.log('------------- state: ', state);

    switch (action.type) {
        case LOG_IN_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticated: true,
                isLoading: false,
                token: action.data,
                loginError: null,
                signupError: null,
            });

        case LOG_IN_FAILURE:
            return Object.assign({}, state, {
                isAuthenticated: false,
                isLoading: false,
                token: null,
                signupError: null,
                loginError: action.error.message || 'Something went wrong.'
            });

        case LOG_OUT_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticated: false,
                isLoading: true,
                token: null,
                loginError: null,
                signupError: null,
            });        

        case SIGN_UP_FAILURE:
            console.log('--------- signup failur error: ', action.eror);

            return Object.assign({}, state, {
                signupError: action.error || 'Something went wrong.'
            });

        case NO_ERROR:
            return Object.assign({}, state, {
                loginError: null,
                signupError: null,
            });

        default:
            return state;
    }
};

export default authReducer;