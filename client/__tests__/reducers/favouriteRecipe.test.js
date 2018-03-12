import { favouriteRecipes } from '../../reducers/favouriteRecipes';
import APPCONSTANT from '../../constant';

describe('favoriteRecipes', () => {
  test('Should return unchanged state when no matching action is found', () => {
    const state = {};
    const newState = favouriteRecipes(state, {
      type: 'UNKNOWN_ACTION'
    });

    expect(newState).toEqual(state);
  });

  test('Should update favoriteRecipes in store when called with GET_FAV_RECIPES action', () => {
    const state = { rows: [{ id: 1 }] };
    const newState = favouriteRecipes(state, {
      type: APPCONSTANT.GET_FAV_RECIPES,
      payload: {
        recipes: { data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] },
        pages: 1
      }
    });

    expect(newState).toEqual({ rows: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }], pages: 1 });
  });

  test('Should update favoriteRecipes in store when called with DELETE_RECIPES action', () => {
    const state = { rows: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] };
    const newState = favouriteRecipes(state, {
      type: APPCONSTANT.DELETE_FAVORITE_RECIPE,
      payload: 1
    });

    expect(newState).toEqual({ rows: [{ id: 2 }, { id: 3 }, { id: 4 }] });
  });
});