import { userRecipes } from '../../reducers/userRecipes';
import APPCONSTANT from '../../constant';

describe('UserRecipes', () => {
  test('Should return unchanged state when no matching action is found', () => {
    const state = {};
    const newState = userRecipes(state, {
      type: 'UNKNOWN_ACTION'
    });

    expect(newState).toEqual(state);
  });
  
  test('Should update userRecipes in store when called with GET_USER_RECIPES action', () => {
    const state = { rows: [{ id: 1 }] };
    const newState = userRecipes(state, {
      type: APPCONSTANT.GET_USER_RECIPES,
      payload: { data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] }
    });

    expect(newState).toEqual({ rows: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] });
  });

  test('Should update userRecipes in store when called with DELETE_RECIPES action', () => {
    const state = { rows: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] };
    const newState = userRecipes(state, {
      type: APPCONSTANT.DELETE_RECIPE,
      payload: 1
    });

    expect(newState).toEqual({ rows: [{ id: 2 }, { id: 3 }, { id: 4 }] });
  });
});