import CONSTANT from '../constant';

export const user = (state = {}, action) => {
  switch (action.type) {
    case CONSTANT.SIGN_UP:
      return {
        ...state, ...action.payload
      };

    case CONSTANT.SIGN_IN:
      return {
        ...state, ...action.payload
      };

    case CONSTANT.EDIT_USER_PROFILE:
      return {
        ...state, user: action.payload.user, token: action.payload.token
      };

    case CONSTANT.SIGN_OUT:
      state = {};
      return state;

    default:
      return state;
  }
};

export default user;
