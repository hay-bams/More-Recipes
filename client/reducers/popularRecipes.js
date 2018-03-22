import CONSTANT from '../constant';

export const popularRecipes = (state = { rows: [] }, action) => {
  switch (action.type) {
    case CONSTANT.GET_POPULAR_RECIPES:
      return action.payload.data !== undefined ?
        { ...state, rows: action.payload.data } :
        state;

    default:
      return state;
  }
};

export default popularRecipes;
