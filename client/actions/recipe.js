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

export const getAllRecipes = async (sort, order, page) => {
  let response;
  if (!sort && !order) {
    response = await axios.get(`${host}/api/v1/recipes?page=${page}`);
    return {
      type: APPCONSTANT.GET_ALL_RECIPES,
      payload: {
        recipes: response.data,
        pages: response.data.pages
      },
    };
  }
  response = await axios.get(`${host}/api/v1/recipes?sort=${sort}&order=${order}&page=${page}`);
  return {
    type: APPCONSTANT.GET_ALL_RECIPES,
    payload: {
      recipes: response.data,
      pages: response.data.pages
    },
  };
};

export const searchRecipes = async (page, search, sort, order) => {
  let response;
  if (!sort && !order) {
    response = await axios.get(`${host}/api/v1/search/recipes?search=${search}&page=${page}`);
    return {
      type: APPCONSTANT.SEARCH_RECIPES,
      payload: {
        recipes: response.data,
        pages: response.data.pages
      },
    };
  }
  response = await axios.get(`${host}/api/v1/search/recipes?sort=${sort}&order=${order}&search=${search}&page=${page}`);
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
