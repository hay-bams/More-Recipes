import { combineReducers } from 'redux';
import APPCONSTANT from '../constant';

export const addRecipe = (state = null, action) => {
  return action.type === APPCONSTANT.ADD_RECIPE ? action.payload : state;
};

export const recipes = (state = [], action) => {
  switch (action.type) {
    case APPCONSTANT.ADD_RECIPE:
      return [
        ...state,
        action.payload
      ];

    case APPCONSTANT.GET_ALL_RECIPES:
      return action.payload.data;

    case APPCONSTANT.GET_USER_RECIPES:
      return action.payload.data;

    default:
      return state;
  }
};

export const user = (state = {}, action) => {
  switch (action.type) {
    case APPCONSTANT.SIGN_UP:
      return {
        ...state,
        userData: action.payload
      };

    case APPCONSTANT.SIGN_IN:
      return {
        ...state,
        userData: action.payload
      };

    default:
      return state;
  }
};

export const errors = (state = {}, action) => {
  switch (action.type) {
    case APPCONSTANT.ERRORS:
      return {
        ...state,
        errors: action.payload
      };

    case APPCONSTANT.CLEAR_ERRORS:
      return { 
        errors: action.payload
      };

    default:
      return state;
  }
};


export default combineReducers({
  user,
  recipes,
  errors
});
