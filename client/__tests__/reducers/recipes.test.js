import { recipes } from '../../reducers/recipes';
import CONSTANT from '../../constant';

describe('Recipe', () => {
  test('DEFAULT Should return unchanged state', () => {
    const state = { rows: [{ id: 2 }] };
    const newState = recipes(state, {
      type: 'UNKNOWN_ACTION'
    });

    expect(newState).toEqual(state);
  });
  test('CASE: ADD_RECIPE Should add recipe to store', () => {
    const state = { rows: [{ id: 2 }, { id: 3 }] };

    const newState = recipes(state, {
      type: CONSTANT.ADD_RECIPE,
      payload: { data: { id: 4 } }
    });

    expect(newState).toEqual({ rows: [{ id: 2 }, { id: 3 }, { id: 4 }] });
  });

  test('CASE: GET_ALL_RECIPE Should update recipes in store', () => {
    const state = {};

    const newState = recipes(state, {
      type: CONSTANT.GET_ALL_RECIPES,
      payload: {
        recipes: { data: [{ id: 2 }, { id: 3 }, { id: 4 }] },
        pages: 1
      }
    });

    expect(newState).toEqual({ 
      rows: [{ id: 2 }, { id: 3 }, { id: 4 }], pages: 1 
    });
  });

  test('CASE: SEARCH_RECIPES Should update recipes in store', () => {
    const state = {};

    const newState = recipes(state, {
      type: CONSTANT.SEARCH_RECIPES,
      payload: {
        recipes: { data: [{ id: 2 }, { id: 3 }, { id: 4 }] },
        pages: 1
      }
    });

    expect(newState).toEqual({ 
      rows: [{ id: 2 }, { id: 3 }, { id: 4 }], pages: 1 
    });
  });
});