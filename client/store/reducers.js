import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import APPCONSTANT from '../constant';

export const signUp = (state = null, action) => {
  return action.type === APPCONSTANT.SIGN_UP ? action.payload : state;
};

export const addRecipe = (state = null, action) => {
  return action.type === APPCONSTANT.ADD_RECIPE ? action.payload : state;
};

export const recipes = (state = {}, action) => {
  switch (action.type) {
    case APPCONSTANT.ADD_RECIPE:
      return [
        ...state,
        action.payload
      ];
    case APPCONSTANT.GET_ALL_RECIPES:
      return action.payload.data;
    default:
      return state;
  }
};

export const users = (state = [], action) => {
  switch (action.type) {
    case APPCONSTANT.SIGN_UP:
      return [
        ...state,
        action.payload
      ];
    default:
      return state;
  }
};

export default combineReducers({
  users,
  recipes,
  form: formReducer
});
