import CONSTANT from '../constant';

const allUsers = (state = [], action) => {
  switch (action.type) {
    case CONSTANT.FIND_USERS:
      return [
        ...action.payload.data
      ];
    default:
      return state;
  }
};

export default allUsers;
