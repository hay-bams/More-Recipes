import axios from 'axios';
import APPCONSTANT from '../constant';

const host = window.location.hostname === 'purpose-more-recipes.herokuapp.com' ?
  'https://purpose-more-recipes.herokuapp.com' : 'http://localhost:8000';


export const addRecipe = async (recipeObject) => {
  try {
    const userData = JSON.parse(localStorage.userData);
    const userToken = userData.token;
    const response = await axios({
      method: 'post',
      url: `${host}/api/v1/recipes`,
      data: recipeObject,
      headers: { token: userToken }
    });
    toastr.success(response.data.message);
    return ({
      type: APPCONSTANT.ADD_RECIPE,
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

export const getAllRecipes = async (page) => {
  const response = await axios.get(`${host}/api/v1/recipes?page=${page}`);
  return {
    type: APPCONSTANT.GET_ALL_RECIPES,
    payload: {
      recipes: response.data,
      pages: response.data.pages
    },
  };
};

export const searchRecipes = async (page, search) => {
  const response = await axios.get(`${host}/api/v1/search/recipes?search=${search}&page=${page}`);
  return {
    type: APPCONSTANT.SEARCH_RECIPES,
    payload: {
      recipes: response.data,
      pages: response.data.pages
    },
  };
};

export const getLatestRecipes = async () => {
  const response = await axios.get(`${host}/api/v1/latest/recipes`);
  return {
    type: APPCONSTANT.GET_LATEST_RECIPES,
    payload: response.data
  };
};

export const getPopularRecipes = async () => {
  const response = await axios.get(`${host}/api/v1/popular/recipes`);
  return {
    type: APPCONSTANT.GET_POPULAR_RECIPES,
    payload: response.data
  };
};

export const getSingleRecipe = async (recipeId) => {
  const userData = localStorage.userData ?
    JSON.parse(localStorage.userData) : '';

  const userToken = userData ? userData.token : '';
  let response;
  if (userToken) {
    response = await axios({
      method: 'get',
      url: `${host}/api/v1/recipes/${recipeId}`,
      headers: { token: userToken }
    });
  } else {
    response = await axios.get(`${host}/api/v1/recipes/${recipeId}`);
  }

  return {
    type: APPCONSTANT.GET_SINGLE_RECIPE,
    payload: response.data
  };
};

export const getUserRecipes = async () => {
  try {
    const userData = JSON.parse(localStorage.userData);
    const userToken = userData.token;
    const userId = userData.user.id;

    const userRecipes = await axios({
      method: 'get',
      url: `${host}/api/v1/${userId}/recipes/`,
      headers: { token: userToken }
    });

    return {
      type: APPCONSTANT.GET_USER_RECIPES,
      payload: userRecipes.data
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

export const deleteRecipe = async (recipeId) => {
  try {
    const userData = JSON.parse(localStorage.userData);
    const userToken = userData.token;

    const response = await axios({
      method: 'delete',
      url: `${host}/api/v1/recipes/${recipeId}`,
      headers: { token: userToken }
    });
    toastr.success(response.data.message);
    return {
      type: APPCONSTANT.DELETE_RECIPE,
      payload: recipeId
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

export const editRecipe = async (recipeObject, recipeId) => {
  try {
    const userData = JSON.parse(localStorage.userData);
    const userToken = userData.token;

    const response = await axios({
      method: 'put',
      url: `${host}/api/v1/recipes/${recipeId}`,
      data: recipeObject,
      headers: { token: userToken }
    });
    toastr.success(response.data.message);
    return ({
      type: APPCONSTANT.EDIT_RECIPE,
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

export const addReview = async (userReview, recipeId) => {
  try {
    const userData = JSON.parse(localStorage.userData);
    const userToken = userData.token;

    const response = await axios({
      method: 'post',
      url: `${host}/api/v1/recipes/${recipeId}/reviews`,
      data: userReview,
      headers: { token: userToken }
    });
    toastr.success(response.data.message);
    return {
      type: APPCONSTANT.ADD_REVIEW,
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
    return {
      type: APPCONSTANT.ADD_REVIEW_ERRORS,
      payload: response,
      name: 'addReviewError'
    };
  }
};

export const getRecipeReviews = async (recipeId) => {
  try {
    let payloadData;

    const recipeReviews = await axios({
      method: 'get',
      url: `${host}/api/v1/reviews/${recipeId}`,
    });

    if (recipeReviews.data.data !== undefined) {
      payloadData = recipeReviews.data.data;
    } else {
      payloadData = [];
    }

    return {
      type: APPCONSTANT.GET_RECIPES_REVIEWS,
      payload: payloadData
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
    return {
      type: APPCONSTANT.GET_REVIEW_ERRORS,
      payload: response,
      name: 'getReviewError'
    };
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

export const upvoteRecipe = async (recipeId, userId) => {
  try {
    const userData = JSON.parse(localStorage.userData);
    const userToken = userData.token;

    const response = await axios({
      method: 'post',
      url: `${host}/api/v1/recipes/upvote/${recipeId}`,
      headers: { token: userToken }
    });

    toastr.success(response.data.message);
    return {
      type: APPCONSTANT.UPVOTE_RECIPE,
      payload: recipeId
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
  }
};

export const downvoteRecipe = async (recipeId) => {
  try {
    const userData = JSON.parse(localStorage.userData);
    const userToken = userData.token;

    const response = await axios({
      method: 'post',
      url: `${host}/api/v1/recipes/downvote/${recipeId}`,
      headers: { token: userToken }
    });

    toastr.success(response.data.message);
    return {
      type: APPCONSTANT.DOWNVOTE_RECIPE,
      payload: recipeId
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
  }
};

export const getFavouriteRecipes = async (page) => {
  try {
    const userData = JSON.parse(localStorage.userData);
    const userToken = userData.token;
    const userId = userData.user.id;

    const response = await axios({
      method: 'get',
      url: `${host}/api/v1/users/${userId}/recipes/${page}`,
      headers: { token: userToken }
    });

    return {
      type: APPCONSTANT.GET_FAV_RECIPES,
      payload: {
        recipes: response.data,
        pages: response.data.pages
      },
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

export const addFavoriteRecipe = async (recipeId) => {
  try {
    const userData = JSON.parse(localStorage.userData);
    const userToken = userData.token;

    const response = await axios({
      method: 'post',
      url: `${host}/api/v1/recipes/${recipeId}`,
      headers: { token: userToken }
    });
    toastr.success(response.data.message);
    return ({
      type: APPCONSTANT.ADD_FAV_RECIPE,
      payload: recipeId
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
    toastr.error(response.data.message);
    return {
      type: APPCONSTANT.ADD_FAVOURITE_ERRORS,
      payload: response,
      name: 'addFavoriteError'
    };
  }
};

export const deleteFavoriteRecipe = async (recipeId) => {
  try {
    const userData = JSON.parse(localStorage.userData);
    const userToken = userData.token;

    const response = await axios({
      method: 'delete',
      url: `${host}/api/v1/${recipeId}/recipes`,
      headers: { token: userToken }
    });
    toastr.success(response.data.message);
    return {
      type: APPCONSTANT.DELETE_FAVORITE_RECIPE,
      payload: recipeId
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
