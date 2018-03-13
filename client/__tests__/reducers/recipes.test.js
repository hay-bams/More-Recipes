import { recipes } from '../../reducers/recipes';
import APPCONSTANT from '../../constant';

describe('Recipe', () => {
  test('Should return unchanged state when no matching action is found', () => {
    const state = { rows: [{ id: 2 }] };
    const newState = recipes(state, {
      type: 'UNKNOWN_ACTION'
    });

    expect(newState).toEqual(state);
  });
  test('Should add recipe to store when called with ADD_RECIPE action', () => {
    const state = { rows: [{ id: 2 }, { id: 3 }] };

    const newState = recipes(state, {
      type: APPCONSTANT.ADD_RECIPE,
      payload: { data: { id: 4 } }
    });

    expect(newState).toEqual({ rows: [{ id: 2 }, { id: 3 }, { id: 4 }] });
  });

  test('Should get all recipe to store when called with GET_ALL_RECIPE action', () => {
    const state = {};

    const newState = recipes(state, {
      type: APPCONSTANT.GET_ALL_RECIPES,
      payload: {
        recipes: { data: [{ id: 2 }, { id: 3 }, { id: 4 }] },
        pages: 1
      }
    });

    expect(newState).toEqual({ rows: [{ id: 2 }, { id: 3 }, { id: 4 }], pages: 1 });
  });

  test('Should search recipe to store when called with SEARCH_RECIPES action', () => {
    const state = {};

    const newState = recipes(state, {
      type: APPCONSTANT.SEARCH_RECIPES,
      payload: {
        recipes: { data: [{ id: 2 }, { id: 3 }, { id: 4 }] },
        pages: 1
      }
    });

    expect(newState).toEqual({ rows: [{ id: 2 }, { id: 3 }, { id: 4 }], pages: 1 });
  });
});