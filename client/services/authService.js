import axios from 'axios';
import { push } from 'connected-react-router';

import { loginSuccess, loginFailure, logoutSuccess, signupFailure, signupSuccess } from '../actions/authAction';
import { API_URL, JWT_TOKEN } from '../config/config';
import { setLocalStorage, clearLocalStorage } from '../utils/storageUtil';

import {createUser} from '../utils/httpUtil';

export const signin = ({ email, password }) => {
  return (dispatch) => {
    axios
      .post(API_URL + 'auth/login', { email, password })
      .then((response) => {
        dispatch(loginSuccess(response.data.token));
        setLocalStorage(JWT_TOKEN, response.data.token);
        dispatch(push('/dashboard'));
      })
      .catch((error) => {
        dispatch(loginFailure(error.response.data));
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    clearLocalStorage(JWT_TOKEN);
    dispatch(logoutSuccess());
    dispatch(push('/'));
    
    return false;
  };
};

export const signup = (data) => {
  return (dispatch) => {
    createUser(data)
    .then(res => {
      console.log('-------------- signup res: ', res);
      if (res.data.success) {
        dispatch(signupSuccess());

      } else  {
        dispatch(signupFailure(res.data.error));
      }
    });
  };
};
