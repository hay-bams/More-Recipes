import { popularRecipes } from '../../reducers/popularRecipes';
import CONSTANT from '../../constant';

describe('popularRecipes', () => {
  test('DEFAULT Should return unchanged state', () => {
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
        payload: { data: [{ id: 1 }, { id: 2 }] }
      });

      expect(newState).toEqual({ rows: [{ id: 1 }, { id: 2 }] });
    }
);
});
