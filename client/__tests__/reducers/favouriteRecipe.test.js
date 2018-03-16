import { favouriteRecipes } from '../../reducers/favouriteRecipes';
import CONSTANT from '../../constant';
import { recipe1, recipe2, recipe3, recipe4 } from
  '../__mocks__/response/mock_recipe_reducer';

describe('favoriteRecipes', () => {
  test('DEFAULT Should return initial state', () => {
    const state = {};
    const newState = favouriteRecipes(state, {
      type: 'UNKNOWN_ACTION'
    });

    expect(newState).toEqual(state);
  });

  test('CASE: GET_FAV_RECIPES Should update favoriteRecipes in store', () => {
    const state = {
      rows: [recipe1]
    };
    const newState = favouriteRecipes(state, {
      type: CONSTANT.GET_FAV_RECIPES,
      payload: {
        recipes: {
          data: [recipe1, recipe2, recipe3, recipe4]
        },
        pages: 1
      }
    });

    expect(newState).toEqual({
      rows: [recipe1, recipe2, recipe3, recipe4],
      pages: 1
    });
  });

  test('CASE: DELETE_RECIPES Should delete favoriteRecipes in store', () => {
    const state = { rows: [recipe1, recipe2, recipe3, recipe4] };
    const newState = favouriteRecipes(state, {
      type: CONSTANT.DELETE_FAVORITE_RECIPE,
      payload: 1
    });

    expect(newState).toEqual({ rows: [recipe2, recipe3, recipe4] });
  });
});
