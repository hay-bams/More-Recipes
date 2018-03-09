import axios from 'axios';
import APPCONSTANT from '../constant';

const host = window.location.hostname === 'purpose-more-recipes.herokuapp.com' ?
  'https://purpose-more-recipes.herokuapp.com' : 'http://localhost:8000';


export const signup = async (userObject) => {
  try {
    const response = await axios.post(
      `${host}/api/v1/users/signup`,
      userObject
    );
    const { token, user } = response.data;
    localStorage.setItem('userToken', token);
    localStorage.setItem('userData', JSON.stringify(response.data));
    toastr.success(response.data.message);
    return {
      type: APPCONSTANT.SIGN_UP,
      payload: {
        user, token
      }
    };
  } catch ({ response }) {
    if (response.data.error !== undefined &&
        response.data.error.name === 'TokenExpiredError') {
      localStorage.removeItem('userData');
      toastr.warning('session has expired, please signin');
      return {
        type: APPCONSTANT.SIGN_OUT,
        payload: null
      };
    }
    toastr.error(response.data.message);
    return {
      type: APPCONSTANT.SIGN_UP_ERRORS,
      payload: response.data.message,
      name: 'signUpError'
    };
  }
};

export const signin = async (userObject) => {
  try {
    const response = await axios.post(
      `${host}/api/v1/users/signin`,
      userObject
    );
    const { token, user } = response.data;
    localStorage.setItem('userData', JSON.stringify(response.data));
    toastr.success(response.data.message);
    return {
      type: APPCONSTANT.SIGN_IN,
      payload: {
        user, token
      }
    };
  } catch ({ response }) {
    if (response.data.error !== undefined &&
        response.data.error.name === 'TokenExpiredError') {
      localStorage.removeItem('userData');
      toastr.warning('session has expired, please signin');
      return {
        type: APPCONSTANT.SIGN_OUT,
        payload: null
      };
    }
    toastr.error(response.data.message);
    return {
      type: APPCONSTANT.SIGN_IN_ERRORS,
      payload: response.data.message,
      name: 'signInError'
    };
  }
};

export const editUserProfile = async (userObject, userId) => {
  try {
    const userData = JSON.parse(localStorage.userData);
    const userToken = userData.token;
    const response = await axios({
      method: 'put',
      url: `${host}/api/v1/user/${userId}`,
      data: userObject,
      headers: { token: userToken }
    });
    toastr.success(response.data.message);
    return ({
      type: APPCONSTANT.EDIT_USER_PROFILE,
      payload: response.data
    });
  } catch ({ response }) {
    if (response.data.error !== undefined &&
      response.data.error.name === 'TokenExpiredError') {
      localStorage.removeItem('userData');
      toastr.warning('session has expired, please signin');
      return {
        type: APPCONSTANT.SIGN_OUT,
        payload: null
      };
    }
  }
};


export const editUserPassword = async (userObject, userId) => {
  try {
    const userData = JSON.parse(localStorage.userData);
    const userToken = userData.token;
    const response = await axios({
      method: 'put',
      url: `${host}/api/v1/${userId}/user`,
      data: userObject,
      headers: { token: userToken }
    });

    toastr.success(response.data.message);
    return ({
      type: APPCONSTANT.EDIT_USER_PASSWORD,
      payload: response.data
    });
  } catch ({ response }) {
    if (response.data.error !== undefined &&
      response.data.error.name === 'TokenExpiredError') {
      localStorage.removeItem('userData');
      toastr.warning('session has expired, please signin');
      return {
        type: APPCONSTANT.SIGN_OUT,
        payload: null
      };
    }
  }
};

export const getUsers = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `${host}/api/v1/users`,
    });
    return {
      type: APPCONSTANT.FIND_USERS,
      payload: response.data
    };
  } catch ({ response }) {
    if (response.data.error !== undefined &&
      response.data.error.name === 'TokenExpiredError') {
      localStorage.removeItem('userData');
      toastr.warning('session has expired, please signin');
      return {
        type: APPCONSTANT.SIGN_OUT,
        payload: null
      };
    }
  }
};

export const signout = async () => {
  try {
    return {
      type: APPCONSTANT.SIGN_OUT,
      payload: null
    };
  } catch (err) {
    return {
      type: APPCONSTANT.SIGN_OUT_ERRORS,
      payload: null,
      name: 'signOutError'
    };
  }
};
