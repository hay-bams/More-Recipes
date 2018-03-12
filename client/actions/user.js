import axios from 'axios';
import CONSTANT from '../constant';

export const signup = async (theUser) => {
  try {
    const response = await axios.post(
      'api/v1/users/signup',
      theUser
    );
    const { token, user } = response.data;
    localStorage.setItem('userToken', token);
    localStorage.setItem('userData', JSON.stringify(response.data));
    toastr.success(response.data.message);
    return {
      type: CONSTANT.SIGN_UP,
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
        type: CONSTANT.SIGN_OUT,
        payload: null
      };
    }
    toastr.error(response.data.message);
    return {
      type: CONSTANT.SIGN_UP_ERRORS,
      payload: response.data.message,
      name: 'signUpError'
    };
  }
};

export const signin = async (theUser) => {
  try {
    const response = await axios.post(
      'api/v1/users/signin',
      theUser
    );
    const { token, user } = response.data;
    localStorage.setItem('userData', JSON.stringify(response.data));
    toastr.success(response.data.message);
    return {
      type: CONSTANT.SIGN_IN,
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
        type: CONSTANT.SIGN_OUT,
        payload: null
      };
    }
    toastr.error(response.data.message);
    return {
      type: CONSTANT.SIGN_IN_ERRORS,
      payload: response.data.message,
      name: 'signInError'
    };
  }
};

export const editUserProfile = async (theUser, userId) => {
  try {
    const userData = JSON.parse(localStorage.userData);
    const userToken = userData.token;
    const response = await axios({
      method: 'put',
      url: `api/v1/user/${userId}`,
      data: theUser,
      headers: { token: userToken }
    });
    toastr.success(response.data.message);
    return ({
      type: CONSTANT.EDIT_USER_PROFILE,
      payload: response.data
    });
  } catch ({ response }) {
    if (response.data.error !== undefined &&
      response.data.error.name === 'TokenExpiredError') {
      localStorage.removeItem('userData');
      toastr.warning('session has expired, please signin');
      return {
        type: CONSTANT.SIGN_OUT,
        payload: null
      };
    }
  }
};


export const editUserPassword = async (theUser, userId) => {
  try {
    const userData = JSON.parse(localStorage.userData);
    const userToken = userData.token;
    const response = await axios({
      method: 'put',
      url: `api/v1/${userId}/user`,
      data: theUser,
      headers: { token: userToken }
    });

    toastr.success(response.data.message);
    return ({
      type: CONSTANT.EDIT_USER_PASSWORD,
      payload: response.data
    });
  } catch ({ response }) {
    if (response.data.error !== undefined &&
      response.data.error.name === 'TokenExpiredError') {
      localStorage.removeItem('userData');
      toastr.warning('session has expired, please signin');
      return {
        type: CONSTANT.SIGN_OUT,
        payload: null
      };
    }
  }
};

export const getUsers = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: 'api/v1/users',
    });
    return {
      type: CONSTANT.FIND_USERS,
      payload: response.data
    };
  } catch ({ response }) {
    if (response.data.error !== undefined &&
      response.data.error.name === 'TokenExpiredError') {
      localStorage.removeItem('userData');
      toastr.warning('session has expired, please signin');
      return {
        type: CONSTANT.SIGN_OUT,
        payload: null
      };
    }
  }
};

export const signout = async () => {
  try {
    return {
      type: CONSTANT.SIGN_OUT,
      payload: null
    };
  } catch (err) {
    return {
      type: CONSTANT.SIGN_OUT_ERRORS,
      payload: null,
      name: 'signOutError'
    };
  }
};
