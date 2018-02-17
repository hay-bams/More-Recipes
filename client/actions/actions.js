import axios from 'axios';
import APPCONSTANT from '../constant';

const host = 'http://localhost:8000';

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
  } catch (err) {
    return {
      type: APPCONSTANT.ERRORS,
      payload: err
    };
  }
};

export const getAllRecipes = async (page) => {
  const recipes = await axios.get(`${host}/api/v1/recipes/page/${page}`);
  return {
    type: APPCONSTANT.GET_ALL_RECIPES,
    payload: {
      recipes: recipes.data,
      pages: recipes.data.pages
    },
  };
};

export const getLatestRecipes = async () => {
  const recipes = await axios.get(`${host}/api/v1/latest/recipes`);
  return {
    type: APPCONSTANT.GET_LATEST_RECIPES,
    payload: recipes.data
  };
};

export const getSingleRecipe = async (recipeId) => {
  const recipe = await axios.get(`${host}/api/v1/recipes/${recipeId}`);
  return {
    type: APPCONSTANT.GET_SINGLE_RECIPE,
    payload: recipe.data
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
  } catch (err) {
    return {
      type: APPCONSTANT.ERRORS,
      payload: err
    };
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
  } catch (err) {
    return {
      type: APPCONSTANT.ERRORS,
      payload: err
    };
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
  } catch (err) {
    return {
      type: APPCONSTANT.ERRORS,
      payload: err
    };
  }
};

export const editUserProfile = async (userObject, userId) => {
  try {
    const userData = JSON.parse(localStorage.userData);

    const response = await axios({
      method: 'put',
      url: `${host}/api/v1/user/${userId}`,
      data: userObject,
    });
    toastr.success(response.data.message);
    return ({
      type: APPCONSTANT.EDIT_USER_PROFILE,
      payload: response.data
    });
  } catch (err) {
    return {
      type: APPCONSTANT.ERRORS,
      payload: err,
      name: 'editProfileError'
    };
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
  } catch (err) {
    return {
      type: APPCONSTANT.ADD_REVIEW_ERRORS,
      payload: err,
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
  } catch (err) {
    return {
      type: APPCONSTANT.GET_REVIEW_ERRORS,
      payload: err,
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
  } catch (err) {
    return {
      type: APPCONSTANT.ERRORS,
      payload: err
    };
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
  } catch (err) {
    toastr.error(err.response.data.message);
    return {
      type: APPCONSTANT.ERRORS,
      payload: err
    };
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
  } catch (err) {
    toastr.error(err.response.data.message);
    return {
      type: APPCONSTANT.ERRORS,
      payload: err
    };
  }
};

export const getFavouriteRecipes = async (page) => {
  try {
    const userData = JSON.parse(localStorage.userData);
    const userToken = userData.token;
    const userId = userData.user.id;

    const response = await axios({
      method: 'get',
      url: `${host}/api/users/${userId}/recipes/${page}`,
      headers: { token: userToken }
    });

    return {
      type: APPCONSTANT.GET_FAV_RECIPES,
      payload: {
        recipes: response.data,
        pages: response.data.pages
      },
    };
  } catch (err) {
    return {
      type: APPCONSTANT.ERRORS,
      payload: err
    };
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
  } catch (err) {

    toastr.error(err.response.data.message);
    return {
      type: APPCONSTANT.ADD_FAVOURITE_ERRORS,
      payload: err,
      name: 'addFavoriteError'
    };
  }
};

export default {
  signup,
  signin,
  addRecipe,
  getAllRecipes,
  getUserRecipes,
  deleteRecipe,
  editRecipe,
  editUserProfile,
  addReview,
  getRecipeReviews,
  getUsers,
  upvoteRecipe,
  downvoteRecipe,
  getFavouriteRecipes,
  addFavoriteRecipe
};
