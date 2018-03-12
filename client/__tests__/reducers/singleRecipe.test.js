import { singleRecipe } from '../../reducers/singleRecipe';
import APPCONSTANT from '../../constant';

describe('singleRecipe', () => {
  test('DEFAULT Should return unchanged state', () => {
    const state = {};
    const newState = singleRecipe(state, {
      type: 'UNKNOWN_ACTION'
    });

    expect(newState).toEqual(state);
  });

  test('CASE: GET_SINGLE_RECIPE Should update single recipe in store', () => {
    const state = {};
    const newState = singleRecipe(state, {
      type: APPCONSTANT.GET_SINGLE_RECIPE,
      payload: { data: { id: 1, upvotes: 0, downvote: 0 } }
    });

    expect(newState).toEqual({ id: 1, upvotes: 0, downvote: 0 });
  });

  test('CASE: UPVOTE_RECIPE Should update recipe upvote in store', () => {
    const state = { id: 1, upvotes: 1, downvotes: 2 };
    singleRecipe(state, {
      type: APPCONSTANT.UPVOTE_RECIPE,
      payload: 1
    });
    expect(state).toEqual({ id: 1, upvotes: 1, downvotes: 1 });
  });

  test('CASE: DOWNVOTE_RECIPE Should update recipe downvote in store', () => {
    const state = { id: 1, upvotes: 1, downvotes: 2 };
    singleRecipe(state, {
      type: APPCONSTANT.DOWNVOTE_RECIPE,
      payload: 1
    });
    expect(state).toEqual({ id: 1, upvotes: 0, downvotes: 2 });
  });
});
