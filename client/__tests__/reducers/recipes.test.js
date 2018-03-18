import { recipes } from '../../reducers/recipes';
import CONSTANT from '../../constant';
import { recipe2, recipe3, recipe4 } from
  '../__mocks__/response/mock_recipe_reducer';

describe('Recipe', () => {
  test('DEFAULT Should return initial state', () => {
    const state = { rows: [recipe2] };
    const newState = recipes(state, {
      type: 'UNKNOWN_ACTION'
    });

    expect(newState).toEqual(state);
  });
  test('CASE: ADD_RECIPE Should add recipe to store', () => {
    const state = { rows: [recipe2, recipe3] };

    const newState = recipes(state, {
      type: CONSTANT.ADD_RECIPE,
      payload: { data: recipe4 }
    });

    expect(newState).toEqual({ rows: [recipe2, recipe3, recipe4] });
  });

  test('CASE: GET_ALL_RECIPE Should update recipes in store', () => {
    const state = {};

    const newState = recipes(state, {
      type: CONSTANT.GET_ALL_RECIPES,
      payload: {
        recipes: { data: [recipe2, recipe3, recipe4] },
        pages: 1
      }
    });

    expect(newState).toEqual({ 
      rows: [recipe2, recipe3, recipe4], pages: 1
    });
  });

  test('CASE: SEARCH_RECIPES Should update recipes in store', () => {
    const state = {};

    const newState = recipes(state, {
      type: CONSTANT.SEARCH_RECIPES,
      payload: {
        recipes: { data: [recipe2, recipe3, recipe4] },
        pages: 1
      }
    });

    expect(newState).toEqual({
      rows: [recipe2, recipe3, recipe4], pages: 1
    });
  });
});
