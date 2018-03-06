import { recipes, latestRecipes, popularRecipes, singleRecipe,
  userRecipes, favouriteRecipes, user, reviews } from '../../store/reducers';
import APPCONSTANT from '../../constant';

describe('all reducers', () => {
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

  describe('latestRecipes', () => {
    test('Should return unchanged state when no matching action is found', () => {
      const state = {};
      const newState = recipes(state, {
        type: 'UNKNOWN_ACTION'
      });

      expect(newState).toEqual(state);
    });

    test('Should update latest recipe in store when called with GET_LATEST_RECIPE action', () => {
      const state = {};
      const newState = latestRecipes(state, {
        type: APPCONSTANT.GET_LATEST_RECIPES,
        payload: { data: [{ id: 1 }, { id: 2 }] }
      });

      expect(newState).toEqual({ rows: [{ id: 1 }, { id: 2 }] });
    });
  });

  describe('popularRecipes', () => {
    test('Should return unchanged state when no matching action is found', () => {
      const state = {};
      const newState = recipes(state, {
        type: 'UNKNOWN_ACTION'
      });

      expect(newState).toEqual(state);
    });

    test('Should popular recipe in  store when called with GET_POPULAR_RECIPE action', () => {
      const state = {};
      const newState = popularRecipes(state, {
        type: APPCONSTANT.GET_POPULAR_RECIPES,
        payload: { data: [{ id: 1 }, { id: 2 }] }
      });

      expect(newState).toEqual({ rows: [{ id: 1 }, { id: 2 }] });
    });
  });

  describe('singleRecipe', () => {
    test('Should return unchanged state when no matching action is found', () => {
      const state = {};
      const newState = recipes(state, {
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

  describe('UserRecipes', () => {
    test('Should update userRecipes in store when called with GET_USER_RECIPES action', () => {
      const state = { rows: [{ id: 1 }] };
      const newState = userRecipes(state, {
        type: APPCONSTANT.GET_USER_RECIPES,
        payload: { data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] }
      });

      expect(newState).toEqual({ rows: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] });
    });

    test('Should update userRecipes in store when called with DELETE_RECIPES action', () => {
      const state = { rows: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] };
      const newState = userRecipes(state, {
        type: APPCONSTANT.DELETE_RECIPE,
        payload: 1
      });

      expect(newState).toEqual({ rows: [{ id: 2 }, { id: 3 }, { id: 4 }] });
    });
  });

  describe('favoriteRecipes', () => {
    test('Should update favoriteRecipes in store when called with GET_FAV_RECIPES action', () => {
      const state = { rows: [{ id: 1 }] };
      const newState = favouriteRecipes(state, {
        type: APPCONSTANT.GET_FAV_RECIPES,
        payload: {
          recipes: { data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] },
          pages: 1
        }
      });

      expect(newState).toEqual({ rows: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }], pages: 1 });
    });

    test('Should update userRecipes in store when called with DELETE_RECIPES action', () => {
      const state = { rows: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] };
      const newState = favouriteRecipes(state, {
        type: APPCONSTANT.DELETE_FAVORITE_RECIPE,
        payload: 1
      });

      expect(newState).toEqual({ rows: [{ id: 2 }, { id: 3 }, { id: 4 }] });
    });
  });

  describe('users', () => {
    test('Should update userData in store when called with SIGN_UP: action', () => {
      const state = { rows: [{ id: 1 }] };
      const newUser = { id: 1 };
      const token = 'some token';
      const newState = user(state, {
        type: APPCONSTANT.SIGN_UP,
        payload: {
          newUser, token
        }
      });

      expect(newState).toEqual({ newUser, token });
    });

    test('Should update userData in store when called with SIGN_IN action', () => {
      const state = { rows: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] };
      const newUser = { id: 1 };
      const token = 'some token';
      const newState = user(state, {
        type: APPCONSTANT.SIGN_IN,
        payload: {
          newUser, token
        }
      });

      expect(newState).toEqual({ newUser, token });
    });

    test('Should update userData in store when called with SIGN_OUT action', () => {
      const state = {};
      const newState = user(state, {
        type: APPCONSTANT.SIGN_OUT,
        payload: null
      });

      expect(newState).toEqual(state);
    });
  });

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
