import { recipes } from '../../store/reducers';
import APPCONSTANT from '../../constant';

describe('The recipe reducer', () => {
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
    // ADD_RECIPE
    //  { rows: [{ id: 2 }, { id: 3 }, { id: 4 }] }
    expect(newState).toEqual({ rows: [{ id: 2 }, { id: 3 }, { id: 4 }] });
  });
});
