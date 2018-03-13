import { singleRecipe } from '../../reducers/singleRecipe';
import APPCONSTANT from '../../constant';

describe('singleRecipe', () => {
  test('Should return unchanged state when no matching action is found', () => {
    const state = {};
    const newState = singleRecipe(state, {
      type: 'UNKNOWN_ACTION'
    });

    expect(newState).toEqual(state);
  });

  test('Should update single recipe in store when called with GET_SINGLE_RECIPE action', () => {
    const state = {};
    const newState = singleRecipe(state, {
      type: APPCONSTANT.GET_SINGLE_RECIPE,
      payload: { data: { id: 1, upvotes: 0, downvote: 0 } }
    });

    expect(newState).toEqual({ id: 1, upvotes: 0, downvote: 0 });
  });

  test('Should update recipe upvote in store when called with UPVOTE_RECIPE action', () => {
    const state = { id: 1, upvotes: 1, downvotes: 2 };
    singleRecipe(state, {
      type: APPCONSTANT.UPVOTE_RECIPE,
      payload: 1
    });
    expect(state).toEqual({ id: 1, upvotes: 1, downvotes: 1 });
  });

  test('Should update recipe downvote in store when called with DOWNVOTE_RECIPE action', () => {
    const state = { id: 1, upvotes: 1, downvotes: 2 };
    singleRecipe(state, {
      type: APPCONSTANT.DOWNVOTE_RECIPE,
      payload: 1
    });
    expect(state).toEqual({ id: 1, upvotes: 0, downvotes: 2 });
  });
});