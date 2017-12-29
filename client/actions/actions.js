import axios from 'axios';
import APPCONSTANT from '../constant';

export const signUp = (id, firstName, lastName, image, email, password, createdAt, updatedAt) => {
  // app logic should go here

  return ({
    type: APPCONSTANT.SIGN_UP,
    payload: {
      id, firstName, lastName, image, password, createdAt, updatedAt
    }
  });
};

export const addRecipe = (id, title, image, ingredients, instructions, upvotes, downvotes, createdAt, updatedAt, userId) => {
  return ({
    type: APPCONSTANT.ADD_RECIPE,
    payload: {
      id, title, image, ingredients, instructions, upvotes, downvotes, createdAt, updatedAt, userId
    }
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

export default {
  signUp,
  addRecipe,
  getAllRecipes

};
