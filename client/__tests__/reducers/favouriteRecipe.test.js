import { favouriteRecipes } from '../../reducers/favouriteRecipes';
import CONSTANT from '../../constant';

describe('favoriteRecipes', () => {
  test('DEFAULT Should return unchanged state', () => {
    const state = {};
    const newState = favouriteRecipes(state, {
      type: 'UNKNOWN_ACTION'
    });

    expect(newState).toEqual(state);
  });

  test('CASE: GET_FAV_RECIPES Should update favoriteRecipes in store', () => {
    const state = { rows: [{ id: 1 }] };
    const newState = favouriteRecipes(state, {
      type: CONSTANT.GET_FAV_RECIPES,
      payload: {
        recipes: { data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] },
        pages: 1
      }
    });

    expect(newState).toEqual({
      rows: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }], pages: 1
    });
  });

  test('CASE: DELETE_RECIPES Should delete favoriteRecipes in store', () => {
    const state = { rows: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] };
    const newState = favouriteRecipes(state, {
      type: CONSTANT.DELETE_FAVORITE_RECIPE,
      payload: 1
    });

    expect(newState).toEqual({ rows: [{ id: 2 }, { id: 3 }, { id: 4 }] });
  });
});
