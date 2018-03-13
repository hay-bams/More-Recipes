import { latestRecipes } from '../../reducers/latestRecipes';
import APPCONSTANT from '../../constant';

describe('latestRecipes', () => {
  test('Should return unchanged state when no matching action is found', () => {
    const state = {};
    const newState = latestRecipes(state, {
      type: 'UNKNOWN_ACTION'
    });

    expect(newState).toEqual(state);
  });

  test('Should update latest recipe in store when called with GET_LATEST_RECIPE action', () => {
    const state = {};
    const newState = latestRecipes(state, {
      type: APPCONSTANT.GET_LATEST_RECIPES,
      payload: { data: [{ id: 1 }, { id: 2 }] }
    });

    expect(newState).toEqual({ rows: [{ id: 1 }, { id: 2 }] });
  });
});