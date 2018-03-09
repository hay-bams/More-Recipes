import { recipes, latestRecipes, popularRecipes, singleRecipe,
  userRecipes, favouriteRecipes, user, reviews } from '../../reducers/reducers';
import APPCONSTANT from '../../constant';

describe('User reducers', () => {
  describe('users', () => {
    test('Should update userData in store when called with SIGN_UP: action', () => {
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

    test('Should update userData in store when called with SIGN_IN action', () => {
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

    test('Should update userData in store when called with SIGN_OUT action', () => {
      const state = {};
      const newState = user(state, {
        type: APPCONSTANT.SIGN_OUT,
        payload: null
      });

      expect(newState).toEqual(state);
    });
  });
});
