import CONSTANT from '../constant';

const errors = (state = {}, action) => {
  switch (action.type) {
    case CONSTANT.ADD_REVIEW_ERRORS:
      return {
        ...state,
        [action.name]: action.payload
      };

    case CONSTANT.GET_REVIEW_ERRORS:
      return {
        ...state,
        [action.name]: action.payload
      };

    case CONSTANT.SIGN_IN_ERRORS:
      return {
        ...state,
        [action.name]: action.payload
      };

    case CONSTANT.SIGN_UP_ERRORS:
      return {
        ...state,
        [action.name]: action.payload
      };

    case CONSTANT.ADD_FAVOURITE_ERRORS:
      return {
        ...state,
        [action.name]: action.payload
      };

    case CONSTANT.CLEAR_ERRORS:
      return {
        errors: action.payload
      };

    default:
      return state;
  }
};

export default errors;
