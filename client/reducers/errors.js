import APPCONSTANT from '../constant';

const errors = (state = {}, action) => {
  switch (action.type) {
    case APPCONSTANT.ADD_REVIEW_ERRORS:
      return {
        ...state,
        [action.name]: action.payload
      };

    case APPCONSTANT.GET_REVIEW_ERRORS:
      return {
        ...state,
        [action.name]: action.payload
      };

    case APPCONSTANT.SIGN_IN_ERRORS:
      return {
        ...state,
        [action.name]: action.payload
      };

    case APPCONSTANT.SIGN_UP_ERRORS:
      return {
        ...state,
        [action.name]: action.payload
      };

    case APPCONSTANT.ADD_FAVOURITE_ERRORS:
      return {
        ...state,
        [action.name]: action.payload
      };

    case APPCONSTANT.CLEAR_ERRORS:
      return {
        errors: action.payload
      };

    default:
      return state;
  }
};

export default errors;
