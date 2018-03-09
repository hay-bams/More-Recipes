import { combineReducers } from 'redux';

import allUsers from './allUsers';
import errors from './errors';
import favouriteRecipes from './favouriteRecipes';
import latestRecipes from './latestRecipes';
import popularRecipes from './popularRecipes';
import singleRecipe from './singleRecipe';
import recipes from './recipes';
import user from './user';
import userRecipes from './userRecipes';
import reviews from './reviews';

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
