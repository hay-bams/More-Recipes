import CONSTANT from '../constant';

export const favouriteRecipes = (state = { rows: [] }, action) => {
  switch (action.type) {
    case CONSTANT.GET_FAV_RECIPES:
      return action.payload.recipes.data !== undefined ?
        {
          ...state,
          pages: action.payload.pages,
          rows: action.payload.recipes.data
        } :
        state;

    case CONSTANT.DELETE_FAVORITE_RECIPE:
      return {
        ...state,
        rows: state.rows.filter(recipe => recipe.id !== action.payload)
      };

    default:
      return state;
  }
};

export default favouriteRecipes;
