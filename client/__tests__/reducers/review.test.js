import { recipes, latestRecipes, popularRecipes, singleRecipe,
  userRecipes, favouriteRecipes, user, reviews } from '../../store/reducers';
import APPCONSTANT from '../../constant';

describe('User reducers', () => {
  describe('reviews', () => {
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
});
