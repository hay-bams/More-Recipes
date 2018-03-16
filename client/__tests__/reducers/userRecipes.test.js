import { userRecipes } from '../../reducers/userRecipes';
import APPCONSTANT from '../../constant';
import { recipe1, recipe2, recipe3, recipe4 } from
  '../__mocks__/response/mock_recipe_reducer';

describe('UserRecipes', () => {
  test('DEFAULT: Should return unchanged state', () => {
    const state = {};
    const newState = userRecipes(state, {
      type: 'UNKNOWN_ACTION'
    });

    expect(newState).toEqual(state);
  });

  test('CASE: GET_USER_RECIPES Should update userRecipes in store', () => {
    const state = { rows: [recipe1] };
    const newState = userRecipes(state, {
      type: APPCONSTANT.GET_USER_RECIPES,
      payload: { data: [recipe1, recipe2, recipe3, recipe4] }
    });

    expect(newState).toEqual({
      rows: [recipe1, recipe2, recipe3, recipe4]
    });
  });

  test('CASE: DELETE_RECIPE Should update userRecipes in store', () => {
    const state = { rows: [recipe1, recipe2, recipe3, recipe4] };
    const newState = userRecipes(state, {
      type: APPCONSTANT.DELETE_RECIPE,
      payload: 1
    });

    expect(newState).toEqual({ rows: [recipe2, recipe3, recipe4] });
  });
});
