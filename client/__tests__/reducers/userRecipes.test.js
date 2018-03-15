import { userRecipes } from '../../reducers/userRecipes';
import APPCONSTANT from '../../constant';

describe('UserRecipes', () => {
  test('DEFAULT: Should return unchanged state', () => {
    const state = {};
    const newState = userRecipes(state, {
      type: 'UNKNOWN_ACTION'
    });

    expect(newState).toEqual(state);
  });

  test('CASE: GET_USER_RECIPES Should update userRecipes in store', () => {
    const state = { rows: [{ id: 1 }] };
    const newState = userRecipes(state, {
      type: APPCONSTANT.GET_USER_RECIPES,
      payload: { data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] }
    });

    expect(newState).toEqual({
      rows: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
    });
  });

  test('CASE: DELETE_RECIPE Should update userRecipes in store', () => {
    const state = { rows: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] };
    const newState = userRecipes(state, {
      type: APPCONSTANT.DELETE_RECIPE,
      payload: 1
    });

    expect(newState).toEqual({ rows: [{ id: 2 }, { id: 3 }, { id: 4 }] });
  });
});
