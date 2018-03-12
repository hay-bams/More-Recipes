import APPCONSTANT from '../constant';

export const reviews = (state = [], action) => {
  switch (action.type) {
    case APPCONSTANT.ADD_REVIEW:
      return [
        ...state,
        action.payload.data
      ];

    case APPCONSTANT.GET_RECIPES_REVIEWS:
      return [
        ...action.payload
      ];
    default:
      return state;
  }
};

export default reviews;
