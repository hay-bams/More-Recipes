import { popularRecipes } from '../../reducers/popularRecipes';
import APPCONSTANT from '../../constant';

describe('popularRecipes', () => {
  test('Should return unchanged state when no matching action is found', () => {
    const state = {};
    const newState = popularRecipes(state, {
      type: 'UNKNOWN_ACTION'
    });

    expect(newState).toEqual(state);
  });

  test('Should popular recipe in  store when called with GET_POPULAR_RECIPE action', () => {
    const state = {};
    const newState = popularRecipes(state, {
      type: APPCONSTANT.GET_POPULAR_RECIPES,
      payload: { data: [{ id: 1 }, { id: 2 }] }
    });

    expect(newState).toEqual({ rows: [{ id: 1 }, { id: 2 }] });
  });
});
