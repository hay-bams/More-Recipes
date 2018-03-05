import { combineReducers } from 'redux';
import APPCONSTANT from '../constant';


export const recipes = (state = { rows: [] }, action) => {
  switch (action.type) {
    case APPCONSTANT.ADD_RECIPE:
      return {
        ...state,
        rows: [
          ...state.rows,
          action.payload.data
        ]
      };

    case APPCONSTANT.GET_ALL_RECIPES:
      return action.payload.recipes.data !== undefined ?
        { ...state, pages: action.payload.pages, rows: action.payload.recipes.data } :
        { rows: null };

    case APPCONSTANT.SEARCH_RECIPES:

      return action.payload.recipes.data !== undefined ?
        { ...state, pages: action.payload.pages, rows: action.payload.recipes.data } :
        { rows: null };

    default:
      return state;
  }
};

export const latestRecipes = (state = { rows: [] }, action) => {
  switch (action.type) {
    case APPCONSTANT.GET_LATEST_RECIPES:
      return action.payload.data !== undefined ?
        { ...state, rows: action.payload.data } :
        state;

    default:
      return state;
  }
};

export const popularRecipes = (state = { rows: [] }, action) => {
  switch (action.type) {
    case APPCONSTANT.GET_POPULAR_RECIPES:
      return action.payload.data !== undefined ?
        { ...state, rows: action.payload.data } :
        state;

    default:
      return state;
  }
};


export const singleRecipe = (state = {}, action) => {
  switch (action.type) {
    case APPCONSTANT.GET_SINGLE_RECIPE:
      return action.payload.data;

    case APPCONSTANT.UPVOTE_RECIPE:
      state.downvotes = state.downvotes > 0 ?
        state.downvotes - 1 :
        state.downvotes;
      return {
        ...state,
        upvotes: state.upvotes + 1,
      };

    case APPCONSTANT.DOWNVOTE_RECIPE:
      state.upvotes = state.upvotes > 0 ?
        state.upvotes - 1 :
        state.upvotes;
      return {
        ...state,
        downvotes: state.downvotes + 1,
      };

    default:
      return state;
  }
};

export const userRecipes = (state = { rows: [] }, action) => {
  switch (action.type) {
    case APPCONSTANT.GET_USER_RECIPES:
      return action.payload.data !== undefined ?
        { ...state, rows: action.payload.data } :
        state;

    case APPCONSTANT.DELETE_RECIPE:
      return { ...state, rows: state.rows.filter(recipe => recipe.id !== action.payload) };

    default:
      return state;
  }
};

export const favouriteRecipes = (state = { rows: [] }, action) => {
  switch (action.type) {
    case APPCONSTANT.GET_FAV_RECIPES:
      return action.payload.recipes.data !== undefined ?
        { ...state, pages: action.payload.pages, rows: action.payload.recipes.data } :
        state;

    case APPCONSTANT.DELETE_FAVORITE_RECIPE:
      return { ...state, rows: state.rows.filter(recipe => recipe.id !== action.payload) };

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

    case APPCONSTANT.SIGN_OUT:
      state = {};
      return state;

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
        ...action.payload
      ];
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
    case APPCONSTANT.ADD_REVIEW_ERRORS:
      return {
        ...state,
        [action.name]: action.payload
      };

    case APPCONSTANT.GET_REVIEW_ERRORS:
      return {
        ...state,
        [action.name]: action.payload
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

    case APPCONSTANT.ADD_FAVOURITE_ERRORS:
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

export default combineReducers({
  userData: user,
  recipes,
  errors,
  userRecipes,
  reviews,
  allUsers,
  singleRecipe,
  latestRecipes,
  favouriteRecipes,
  popularRecipes
});
