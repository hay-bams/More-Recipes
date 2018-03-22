import CONSTANT from '../constant';

export const recipes = (state = { rows: [] }, action) => {
  switch (action.type) {
    case CONSTANT.ADD_RECIPE:
      return {
        ...state,
        rows: [
          ...state.rows,
          action.payload.data
        ]
      };

    case CONSTANT.GET_ALL_RECIPES:
      return action.payload.recipes.data !== undefined ?
        {
          ...state,
          pages: action.payload.pages,
          rows: action.payload.recipes.data
        } :
        { rows: null };

    case CONSTANT.SEARCH_RECIPES:

      return action.payload.recipes.data !== undefined ?
        {
          ...state,
          pages: action.payload.pages,
          rows: action.payload.recipes.data
        } :
        { rows: null };

    default:
      return state;
  }
};

export default recipes;
