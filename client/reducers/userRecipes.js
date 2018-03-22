import CONSTANT from '../constant';

export const userRecipes = (state = { rows: [] }, action) => {
  switch (action.type) {
    case CONSTANT.GET_USER_RECIPES:
      return action.payload.data !== undefined ?
        { ...state, rows: action.payload.data } :
        state;

    case CONSTANT.DELETE_RECIPE:
      return {
        ...state,
        rows: state.rows.filter(recipe => recipe.id !== action.payload)
      };

    default:
      return state;
  }
};

export default userRecipes;
