import { reviews } from '../../reducers/reviews';
import APPCONSTANT from '../../constant';

describe('reviews', () => {
  test('Should return unchanged state when no matching action is found', () => {
    const state = {};
    const newState = reviews(state, {
      type: 'UNKNOWN_ACTION'
    });

    expect(newState).toEqual(state);
  });

  test('Should update review in store when called with ADD_REVIEW action', () => {
    const state = [];
    const newReview = { data: { id: 1 } };
    const newState = reviews(state, {
      type: APPCONSTANT.ADD_REVIEW,
      payload: newReview
    });

    expect(newState).toEqual([{ id: 1 }]);
  });

  test('Should update reviews in store when called with ADD_REVIEW action', () => {
    const state = [];
    const allReviews = [{ id: 1 }, { id: 2 }];
    const newState = reviews(state, {
      type: APPCONSTANT.GET_RECIPES_REVIEWS,
      payload: allReviews
    });

    expect(newState).toEqual([{ id: 1 }, { id: 2 }]);
  });
});
