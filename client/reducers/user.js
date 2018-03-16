import APPCONSTANT from '../constant';

export const user = (state = {}, action) => {
  switch (action.type) {
    case APPCONSTANT.SIGN_UP:
      return {
        ...action.payload
      };

    case APPCONSTANT.SIGN_IN:
      return {
        ...action.payload
      };

    case APPCONSTANT.SIGN_OUT:
      state = {};
      return state;


    default:
      return state;
  }
};

export default user;
