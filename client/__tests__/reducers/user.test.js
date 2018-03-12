import { user } from '../../reducers/user';
import APPCONSTANT from '../../constant';

describe('users', () => {
  test('DEFAULT Should return unchanged state', () => {
    const state = {};
    const newState = user(state, {
      type: 'UNKNOWN_ACTION'
    });

    expect(newState).toEqual(state);
  });

  test('CASE: SIGN_UP Should update userData in store', () => {
    const state = { rows: [{ id: 1 }] };
    const newUser = { id: 1 };
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
    const state = { rows: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] };
    const newUser = { id: 1 };
    const token = 'some token';
    const newState = user(state, {
      type: APPCONSTANT.SIGN_IN,
      payload: {
        newUser, token
      }
    });

    expect(newState).toEqual({ newUser, token });
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
