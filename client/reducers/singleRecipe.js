import CONSTANT from '../constant';

export const singleRecipe = (state = {}, action) => {
  switch (action.type) {
    case CONSTANT.GET_SINGLE_RECIPE:
      return action.payload.data;

    case CONSTANT.UPVOTE_RECIPE:
      state.downvotes = state.downvotes > 0 ?
        state.downvotes - 1 :
        state.downvotes;
      return {
        ...state,
        upvotes: state.upvotes + 1,
      };

    case CONSTANT.DOWNVOTE_RECIPE:
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

export default singleRecipe;
