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

export default {
  signUp,
  addRecipe,
  getAllRecipes

};
