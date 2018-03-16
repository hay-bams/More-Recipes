import { latestRecipes } from '../../reducers/latestRecipes';
import CONSTANT from '../../constant';
import { recipe1, recipe2 } from
  '../__mocks__/response/mock_recipe_reducer';

describe('latestRecipes', () => {
  test('DEFAULT: Should return initial state', () => {
    const state = {};
    const newState = latestRecipes(state, {
      type: 'UNKNOWN_ACTION'
    });

    expect(newState).toEqual(state);
  });

  test('CASE: GET_LATEST_RECIPES Should update latestRecipes in store', () => {
    const state = {};
    const newState = latestRecipes(state, {
      type: CONSTANT.GET_LATEST_RECIPES,
      payload: { data: [recipe1, recipe2] }
    });

    expect(newState).toEqual({ rows: [recipe1, recipe2] });
  });
});