import APPCONSTANT from '../constant';

const allUsers = (state = [], action) => {
  switch (action.type) {
    case APPCONSTANT.FIND_USERS:
      return [
        ...action.payload.data
      ];
    default:
      return state;
  }
};

export default allUsers;
