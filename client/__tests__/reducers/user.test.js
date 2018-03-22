import { user } from '../../reducers/user';
import APPCONSTANT from '../../constant';
import { user1, user2, user3, user4, user5, user6 } from
  '../__mocks__/response/mock_user_reducer';

describe('users', () => {
  test('DEFAULT Should return unchanged state', () => {
    const state = {};
    const newState = user(state, {
      type: 'UNKNOWN_ACTION'
    });

    expect(newState).toEqual(state);
  });

  test('CASE: SIGN_UP Should update userData in store', () => {
    const state = {};
    const newUser = user2;
    const token = 'some token';
    const newState = user(state, {
      type: APPCONSTANT.SIGN_UP,
      payload: {
        newUser, token
      }
    });

    expect(newState).toEqual({ newUser, token });
  });

  test('CASE: SIGN_IN Should update userData in store', () => {
    const state = {};
    const newUser = user5;
    const token = 'some token';
    const newState = user(state, {
      type: APPCONSTANT.SIGN_IN,
      payload: {
        newUser, token
      }
    });

    expect(newState).toEqual({ newUser, token });
  });

  test('CASE: EDIT_USER_PROFILE Should update userData in store', () => {
    const newUser = user6;
    const token = 'some token';
    const state = { user: user5, token };
    const newState = user(state, {
      type: APPCONSTANT.EDIT_USER_PROFILE,
      payload: {
        user: newUser, token
      }
    });

    expect(newState).toEqual({ user: newUser, token }); 
  });

  test('CASE: SIGN_OUT Should update userData in store', () => {
    const state = {};
    const newState = user(state, {
      type: APPCONSTANT.SIGN_OUT,
      payload: null
    });

    expect(newState).toEqual(state);
  });
});
