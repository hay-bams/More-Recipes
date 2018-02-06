import { combineReducers } from 'redux';
import APPCONSTANT from '../constant';


export const recipes = (state = [], action) => {
  switch (action.type) {
    case APPCONSTANT.ADD_RECIPE:
      return [
        ...state,
        action.payload.data,
      ];

    case APPCONSTANT.GET_ALL_RECIPES:
      return action.payload.data;

    default:
      return state;
  }
};


export const singleRecipe = (state = {}, action) => {
  switch (action.type) {
    case APPCONSTANT.GET_SINGLE_RECIPE:
      return action.payload.data;

    case APPCONSTANT.UPVOTE_RECIPE:
      return {
        ...state,
        upvotes: state.upvotes + 1
      };

    default:
      return state;
  }
};

export const userRecipes = (state = [], action) => {
  switch (action.type) {
    case APPCONSTANT.GET_USER_RECIPES:
      return action.payload.data;

    case APPCONSTANT.DELETE_RECIPE:
      return state.filter(recipe => recipe.id !== action.payload);

    default:
      return state;
  }
};

export const user = (state = {}, action) => {
  switch (action.type) {
    case APPCONSTANT.SIGN_UP:
      return {
        ...action.payload
      };

    case APPCONSTANT.SIGN_IN:
      return {
        ...action.payload
      };

    case APPCONSTANT.ERRORS:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};

export const reviews = (state = [], action) => {
  switch (action.type) {
    case APPCONSTANT.ADD_REVIEW:
      return [
        ...state,
        action.payload.data
      ];

    case APPCONSTANT.GET_RECIPES_REVIEWS:
      return [
        ...action.payload.data
      ];

    case APPCONSTANT.ERRORS:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};

export const allUsers = (state = [], action) => {
  switch (action.type) {
    case APPCONSTANT.FIND_USERS:
      return [
        ...action.payload.data
      ];
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


    case APPCONSTANT.SIGN_IN_ERRORS:
      return {
        ...state,
        [action.name]: action.payload
      };

    case APPCONSTANT.SIGN_UP_ERRORS:
      return {
        ...state,
        [action.name]: action.payload
      };

    case APPCONSTANT.CLEAR_ERRORS:
      return {
        errors: action.payload
      };

    default:
      return state;
  }
};

export const upvote = (state = {}, action) => {
  switch (action.type) {
    case APPCONSTANT.UPVOTE_RECIPE:
      return {
        ...action.payload.data
      };
    default:
      return state;
  }
};

export default combineReducers({
  userData: user,
  recipes,
  errors,
  userRecipes,
  reviews,
  allUsers,
  singleRecipe
});
