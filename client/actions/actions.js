import axios from 'axios';
import jwt from 'jsonwebtoken';
import APPCONSTANT from '../constant';

const secret = 'This is your guy';

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

export const getUserRecipes = async () => {
  try {
    let userId;
    const userToken = localStorage['userToken']
    jwt.verify(userToken, secret, (err, decoded) => {
      userId = decoded.id;
    })
     
    const userRecipes = await axios({
      method: 'get',
      url: `http://localhost:8000/api/v1/recipes/${userId}`,
      headers: {token: localStorage['userToken']}
    });

    return {
      type: APPCONSTANT.GET_USER_RECIPES,
      payload: userRecipes
    }
  } catch(err) {
    return {
      type: APPCONSTANT.ERRORS,
      payload: err
    };
  }
}


export const signup = async (userObject) => {
  try {
    const user = await axios.post('http://localhost:8000/api/v1/users/signup', userObject);
    localStorage['userToken'] = user.data.token;
    return {
      type: APPCONSTANT.SIGN_UP,
      payload: user
    };
  } catch ({ response }) {
    return {
      type: APPCONSTANT.SIGN_UP_ERRORS,
      payload: response.data.message,
      name: 'signUpError'
    }
  }
};

export const signin = async (userObject) => {
  try {
    const user = await axios.post('http://localhost:8000/api/v1/users/signin', userObject);
    localStorage['userToken'] = user.data.token;
    return {
      type: APPCONSTANT.SIGN_IN,
      payload: user
    };
  } catch (err) {
    return {
      type: APPCONSTANT.SIGN_IN_ERRORS,
      payload: err
    }
  }
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
  clearError,
  getUserRecipes
};
