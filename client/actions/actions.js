import axios from 'axios';
import APPCONSTANT from '../constant';

export const addRecipe = async (recipeObject) => {
  let recipe;
  try {
    recipe = await axios({
      method: 'post',
      url: 'http://localhost:8000/api/v1/recipes',
      data: recipeObject,
      headers: {token: localStorage['userToken']}
    });
  } catch (err) {
      return {
        type: APPCONSTANT.ERRORS,
        payload: err
      };
  }
  return ({
    type: APPCONSTANT.ADD_RECIPE,
    payload: recipe
  });
};

export const getAllRecipes = () => {
  const recipes = axios.get('http://localhost:8000/api/v1/recipes');
  return {
    type: APPCONSTANT.GET_ALL_RECIPES,
    payload: recipes
  };
};

export const signup = async (userObject) => {
  let user;
  try {
    user = await axios.post('http://localhost:8000/api/v1/users/signup', userObject);
  } catch (err) {
    console.log(err);
  }
  return {
    type: APPCONSTANT.SIGN_UP,
    payload: user
  };
};

export const signin = async (userObject) => {
  let user;

  try {
    user = await axios.post('http://localhost:8000/api/v1/users/signin', userObject);
    localStorage['userToken'] = user.data.token;
  } catch (err) {
    return {
      type: APPCONSTANT.ERRORS,
      payload: err
    };
  }
  return {
    type: APPCONSTANT.SIGN_IN,
    payload: user
  };
};

export const clearError = () => {
  return {
    type: APPCONSTANT.CLEAR_ERRORS,
    payload: null
  }
}

export default {
  signup,
  addRecipe,
  getAllRecipes,
  clearError
};
