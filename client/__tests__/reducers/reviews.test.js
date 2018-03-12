import { reviews } from '../../reducers/reviews';
import APPCONSTANT from '../../constant';

describe('reviews', () => {
  test('DEFAULT Should return unchanged state', () => {
    const state = {};
    const newState = reviews(state, {
      type: 'UNKNOWN_ACTION'
    });

    expect(newState).toEqual(state);
  });

  test('CASE: ADD_REVIEW Should update review in store', () => {
    const state = [];
    const newReview = { data: { id: 1 } };
    const newState = reviews(state, {
      type: APPCONSTANT.ADD_REVIEW,
      payload: newReview
    });

    expect(newState).toEqual([{ id: 1 }]);
  });

  test('CASE: GET_RECIPES_REVIEWS Should update reviews in store', () => {
    const state = [];
    const allReviews = [{ id: 1 }, { id: 2 }];
    const newState = reviews(state, {
      type: APPCONSTANT.GET_RECIPES_REVIEWS,
      payload: allReviews
    });

    expect(newState).toEqual([{ id: 1 }, { id: 2 }]);
  });
});
