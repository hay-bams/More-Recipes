import axios from 'axios';
import APPCONSTANT from '../constant';

const host = 'http://localhost:8000';

export const addRecipe = async (recipeObject) => {
  try {
    const userData = JSON.parse(localStorage.userData);
    const userToken = userData.token;

    const recipe = await axios({
      method: 'post',
      url: `${host}/api/v1/recipes`,
      data: recipeObject,
      headers: { token: userToken }
    });
    return ({
      type: APPCONSTANT.ADD_RECIPE,
      payload: recipe.data
    });
  } catch (err) {
    return {
      type: APPCONSTANT.ERRORS,
      payload: err
    };
  }
};

export const getAllRecipes = async () => {
  const recipes = await axios.get(`${host}/api/v1/recipes`);
  return {
    type: APPCONSTANT.GET_ALL_RECIPES,
    payload: recipes.data
  };
};

export const getUserRecipes = async () => {
  try {
    const userData = JSON.parse(localStorage.userData);
    const userToken = userData.token;
    const userId = userData.user;

    const userRecipes = await axios({
      method: 'get',
      url: `${host}/api/v1/recipes/${userId}`,
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
    return {
      type: APPCONSTANT.SIGN_UP,
      payload: {
        user, token
      }
    };
  } catch ({ response }) {
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
    return {
      type: APPCONSTANT.SIGN_IN,
      payload: {
        user, token
      }
    };
  } catch ({ response }) {
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

    await axios({
      method: 'delete',
      url: `${host}/api/v1/recipes/${recipeId}`,
      headers: { token: userToken }
    });

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

    const recipe = await axios({
      method: 'put',
      url: `${host}/api/v1/recipes/${recipeId}`,
      data: recipeObject,
      headers: { token: userToken }
    });
    return ({
      type: APPCONSTANT.EDIT_RECIPE,
      payload: recipe.data
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

    const recipe = await axios({
      method: 'put',
      url: `${host}/api/v1/user/${userId}`,
      data: userObject,
    });
    return ({
      type: APPCONSTANT.EDIT_USER_PROFILE,
      payload: recipe.data
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
    const review = await axios({
      method: 'post',
      url: `${host}/api/v1/recipes/${recipeId}/reviews`,
      data: userReview,
      headers: { token: userToken }
    });

    return {
      type: APPCONSTANT.ADD_REVIEW,
      payload: review.data
    };
  } catch (err) {
    return {
      type: APPCONSTANT.ERRORS,
      payload: err,
      name: 'addReviewError'
    };
  }
};

export const getRecipeReviews = async (recipeId) => {
  try {
    const recipeReviews = await axios({
      method: 'get',
      url: `${host}/api/v1/reviews/${recipeId}`,
    });

    return {
      type: APPCONSTANT.GET_RECIPES_REVIEWS,
      payload: recipeReviews.data
    };
  } catch (err) {
    return {
      type: APPCONSTANT.ERRORS,
      payload: err
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

export const upvoteRecipe = async (recipeId) => {
  try {
    const userData = JSON.parse(localStorage.userData);
    const userToken = userData.token;

    const response = await axios({
      method: 'post',
      url: `${host}/api/v1/recipes/upvote/${recipeId}`,
      headers: { token: userToken }
    });

    return {
      type: APPCONSTANT.UPVOTE_RECIPE,
      payload: response.data
    };
  } catch (err) {
    return {
      type: APPCONSTANT.ERRORS,
      payload: err
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
  upvoteRecipe
};
