import { popularRecipes } from '../../reducers/popularRecipes';
import CONSTANT from '../../constant';
import { recipe1, recipe2, } from
  '../__mocks__/response/mock_recipe_reducer';

describe('popularRecipes', () => {
  test('DEFAULT Should return initial state', () => {
    const state = {};
    const newState = popularRecipes(state, {
      type: 'UNKNOWN_ACTION'
    });

    expect(newState).toEqual(state);
  });

  test(
    'CASE: GET_POPULAR_RECIPES Should update popularRecipes in store',
    () => {
      const state = {};
      const newState = popularRecipes(state, {
        type: CONSTANT.GET_POPULAR_RECIPES,
        payload: { data: [recipe1, recipe2] }
      });

      expect(newState).toEqual({ rows: [recipe1, recipe2] });
    }
  );
});
