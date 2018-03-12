import { latestRecipes } from '../../reducers/latestRecipes';
import CONSTANT from '../../constant';

describe('latestRecipes', () => {
  test('DEFAULT: Should return unchanged state', () => {
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
      payload: { data: [{ id: 1 }, { id: 2 }] }
    });

    expect(newState).toEqual({ rows: [{ id: 1 }, { id: 2 }] });
  });
});