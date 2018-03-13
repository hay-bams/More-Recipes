import APPCONSTANT from '../constant';

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

export default userRecipes;
