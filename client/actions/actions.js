import axios from 'axios';
import jwt from 'jsonwebtoken';
import APPCONSTANT from '../constant';

const secret = 'This is your guy';
const host = 'http://localhost:8000';

export const addRecipe = async (recipeObject) => {
  let recipe;
  try {
    recipe = await axios({
      method: 'post',
      url: `${host}/api/v1/recipes`,
      data: recipeObject,
      headers: { token: localStorage.getItem('userToken') }
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
    let userId;
    const { userToken } = localStorage;
    
    jwt.verify(userToken, secret, (err, decoded) => {
      userId = decoded.id;
    });

    const userRecipes = await axios({
      method: 'get',
      url: `${host}/api/v1/recipes/${userId}`,
      headers: { token: localStorage.getItem('userToken') }
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
    localStorage.setItem('userToken', token);
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

export const clearError = () => ({
  type: APPCONSTANT.CLEAR_ERRORS,
  payload: null
});

export default {
  signup,
  signin,
  addRecipe,
  getAllRecipes,
  clearError,
  getUserRecipes
};
