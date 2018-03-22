import CONSTANT from '../constant';

export const reviews = (state = [], action) => {
  switch (action.type) {
    case CONSTANT.ADD_REVIEW:
      return [
        ...state,
        action.payload.data
      ];

    case CONSTANT.GET_RECIPES_REVIEWS:
      return [
        ...action.payload
      ];
    default:
      return state;
  }
};

export default reviews;
