import CONSTANT from '../constant';

export const latestRecipes = (state = { rows: [] }, action) => {
  switch (action.type) {
    case CONSTANT.GET_LATEST_RECIPES:
      return action.payload.data !== undefined ?
        { ...state, rows: action.payload.data } :
        state;

    default:
      return state;
  }
};

export default latestRecipes;
