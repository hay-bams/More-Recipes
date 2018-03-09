import APPCONSTANT from '../constant';

const popularRecipes = (state = { rows: [] }, action) => {
  switch (action.type) {
    case APPCONSTANT.GET_POPULAR_RECIPES:
      return action.payload.data !== undefined ?
        { ...state, rows: action.payload.data } :
        state;

    default:
      return state;
  }
};

export default popularRecipes;
