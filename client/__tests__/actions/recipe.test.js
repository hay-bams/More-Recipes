import moxios from 'moxios';
import reduxPromise from 'redux-promise';
import configureMockStore from 'redux-mock-store';

import APPCONSTANT from '../../constant';
import { addRecipe, getAllRecipes, searchRecipes, getLatestRecipes,
  getPopularRecipes, getSingleRecipe, getUserRecipes,
  deleteRecipe, editRecipe, upvoteRecipe, downvoteRecipe, getFavouriteRecipes,
  addFavoriteRecipe, deleteFavoriteRecipe,
  signout } from '../../actions/actions';

import { recipeResponse, getRecipeResponse, singleRecipe,
  recipeUpdate, upvote, downvote } from '../__mocks__/response/response';


const mockStore = configureMockStore([reduxPromise]);
describe('All actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Add Recipe', () => {
    test('Should dispatch addRecipe action when addRecipe is called', async () => {
      moxios.stubRequest('http://localhost:8000/api/v1/recipes', {
        status: 201,
        response: recipeResponse
      });
      localStorage.userData = JSON.stringify({
        token: 'some_token'
      });
      const store = mockStore({});

      const expectedAction = {
        type: APPCONSTANT.ADD_RECIPE,
        payload: recipeResponse
      };

      await store.dispatch(addRecipe({
        title: 'title',
        image: 'image',
        instructions: 'instructiona',
        ingredients: 'ingredeints'
      }));
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });

  describe('Get all recipes', () => {
    test('Should dispatch getAllRecipes action when getAllRecipe is called', async () => {
      moxios.wait(() => {
        const getRecipesRequest = moxios.requests.mostRecent();
        getRecipesRequest.respondWith({
          status: 200,
          response: getRecipeResponse
        });
      });

      const store = mockStore({});
      const expectedAction = {
        type: APPCONSTANT.GET_ALL_RECIPES,
        payload: {
          recipes: getRecipeResponse,
          pages: getRecipeResponse.pages
        }
      };
      await store.dispatch(getAllRecipes(1));
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });

  describe('Search recipes', () => {
    test('Should dispatch searchRecipes action when searchRecipes action is called', async () => {
      moxios.wait(() => {
        const getRecipesRequest = moxios.requests.mostRecent();
        getRecipesRequest.respondWith({
          status: 200,
          response: getRecipeResponse
        });
      });

      const store = mockStore({});
      const expectedAction = {
        type: APPCONSTANT.SEARCH_RECIPES,
        payload: {
          recipes: getRecipeResponse,
          pages: getRecipeResponse.pages
        }
      };
      await store.dispatch(searchRecipes(1, 'stew'));
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });

  describe('Get latest recipes', () => {
    test('Should dispatch getLatestRecipe action when getLatestRecipe action is called', async () => {
      moxios.wait(() => {
        const getRecipesRequest = moxios.requests.mostRecent();
        getRecipesRequest.respondWith({
          status: 200,
          response: getRecipeResponse
        });
      });

      const store = mockStore({});
      const expectedAction = {
        type: APPCONSTANT.GET_LATEST_RECIPES,
        payload: getRecipeResponse
      };
      await store.dispatch(getLatestRecipes());
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });

  describe('Get popular recipes', () => {
    test('Should dispatch getPopularRecipes action when getPopularRecipes is called', async () => {
      moxios.wait(() => {
        const getRecipesRequest = moxios.requests.mostRecent();
        getRecipesRequest.respondWith({
          status: 200,
          response: getRecipeResponse
        });
      });

      const store = mockStore({});
      const expectedAction = {
        type: APPCONSTANT.GET_POPULAR_RECIPES,
        payload: getRecipeResponse
      };
      await store.dispatch(getPopularRecipes());
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });

  describe('Get single recipe', () => {
    test('Should dispatch getSingleRecipe action when getSingleAction is called', async () => {
      moxios.wait(() => {
        const getRecipesRequest = moxios.requests.mostRecent();
        getRecipesRequest.respondWith({
          status: 200,
          response: singleRecipe
        });
      });

      const store = mockStore({});
      const expectedAction = {
        type: APPCONSTANT.GET_SINGLE_RECIPE,
        payload: singleRecipe
      };
      await store.dispatch(getSingleRecipe());
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });

  describe('Get user recipes', () => {
    test('Should dispatch getUserRecipe action when getUserRecipe action is dispatch', async () => {
      moxios.wait(() => {
        const getRecipesRequest = moxios.requests.mostRecent();
        getRecipesRequest.respondWith({
          status: 200,
          response: getRecipeResponse
        });
      });

      localStorage.userData = JSON.stringify({
        token: 'some_token',
        user: { id: 1 }
      });

      const store = mockStore({});
      const expectedAction = {
        type: APPCONSTANT.GET_USER_RECIPES,
        payload: getRecipeResponse
      };
      await store.dispatch(getUserRecipes());
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });

  describe('Delete a recipe', () => {
    test('Should dispatch deleteRecipe action when deleteRecipe action is called', async () => {
      moxios.wait(() => {
        const getRecipesRequest = moxios.requests.mostRecent();
        getRecipesRequest.respondWith({
          status: 200,
          response: { success: 'true', message: 'Recipe deleted' }
        });
      });

      localStorage.userData = JSON.stringify({
        token: 'some_token'
      });

      const recipeId = 1;
      const store = mockStore({});
      const expectedAction = {
        type: APPCONSTANT.DELETE_RECIPE,
        payload: recipeId
      };
      await store.dispatch(deleteRecipe(1));
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });

  describe('Edit a recipe', () => {
    test('Should dispatch editRecipe action when editRecipe action is called', async () => {
      moxios.wait(() => {
        const getRecipesRequest = moxios.requests.mostRecent();
        getRecipesRequest.respondWith({
          status: 200,
          response: recipeUpdate
        });
      });

      localStorage.userData = JSON.stringify({
        token: 'some_token'
      });

      const store = mockStore({});
      const expectedAction = {
        type: APPCONSTANT.EDIT_RECIPE,
        payload: recipeUpdate
      };
      const newRecipe = {
        title: 'title',
        image: 'image',
        instructions: 'instructiona',
        ingredients: 'ingredeints'
      };
      await store.dispatch(editRecipe(newRecipe, 1));
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });

  describe('Upvote recipe', () => {
    test('Should dispatch upvoteRecipe action when upvoteRecipe action is called', async () => {
      moxios.wait(() => {
        const getRecipesRequest = moxios.requests.mostRecent();
        getRecipesRequest.respondWith({
          status: 200,
          response: upvote
        });
      });

      localStorage.userData = JSON.stringify({
        token: 'some_token'
      });

      const recipeId = 15;
      const store = mockStore({});
      const expectedAction = {
        type: APPCONSTANT.UPVOTE_RECIPE,
        payload: recipeId
      };

      await store.dispatch(upvoteRecipe(15, 1));
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });

  describe('Downvote recipe', () => {
    test('Should dispatch downvoteRecipe action when downvoteRecipe action is called', async () => {
      moxios.wait(() => {
        const getRecipesRequest = moxios.requests.mostRecent();
        getRecipesRequest.respondWith({
          status: 200,
          response: downvote
        });
      });

      localStorage.userData = JSON.stringify({
        token: 'some_token'
      });

      const recipeId = 15;
      const store = mockStore({});
      const expectedAction = {
        type: APPCONSTANT.DOWNVOTE_RECIPE,
        payload: recipeId
      };

      await store.dispatch(downvoteRecipe(15, 1));
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });

  describe('Get favourite recipes', () => {
    test('Should dispatch getFavouriteRecipes action when getFavouriteRecipe is called', async () => {
      moxios.wait(() => {
        const getRecipesRequest = moxios.requests.mostRecent();
        getRecipesRequest.respondWith({
          status: 200,
          response: getRecipeResponse
        });
      });

      localStorage.userData = JSON.stringify({
        token: 'some_token',
        user: { id: 1 }
      });

      const store = mockStore({});
      const expectedAction = {
        type: APPCONSTANT.GET_FAV_RECIPES,
        payload: {
          recipes: getRecipeResponse,
          pages: getRecipeResponse.pages
        }
      };
      await store.dispatch(getFavouriteRecipes(1));
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });

  describe('add favourite recipes', () => {
    test('Should dispatch addFavouriteRecipes action when addFavouriteRecipe is called', async () => {
      moxios.wait(() => {
        const getRecipesRequest = moxios.requests.mostRecent();
        getRecipesRequest.respondWith({
          status: 200,
          response: {}
        });
      });

      localStorage.userData = JSON.stringify({
        token: 'some_token',
        user: { id: 1 }
      });

      const recipeId = 1;
      const store = mockStore({});
      const expectedAction = {
        type: APPCONSTANT.ADD_FAV_RECIPE,
        payload: recipeId
      };
      await store.dispatch(addFavoriteRecipe(1));
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });

  describe('delete favourite recipes', () => {
    test('Should dispatch deleteFavouriteRecipes action when deleteFavouriteRecipe is called', async () => {
      moxios.wait(() => {
        const getRecipesRequest = moxios.requests.mostRecent();
        getRecipesRequest.respondWith({
          status: 200,
          response: {}
        });
      });

      localStorage.userData = JSON.stringify({
        token: 'some_token',
        user: { id: 1 }
      });

      const recipeId = 1;
      const store = mockStore({});
      const expectedAction = {
        type: APPCONSTANT.DELETE_FAVORITE_RECIPE,
        payload: recipeId
      };
      await store.dispatch(deleteFavoriteRecipe(1));
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });

  describe('signout user', () => {
    test('Should dispatch signOut action when signOut is called', async () => {
      moxios.wait(() => {
        const getRecipesRequest = moxios.requests.mostRecent();
        getRecipesRequest.respondWith({
          status: 200,
          response: {}
        });
      });

      localStorage.userData = JSON.stringify({
        token: 'some_token',
        user: { id: 1 }
      });

      const store = mockStore({});
      const expectedAction = {
        type: APPCONSTANT.SIGN_OUT,
        payload: null
      };
      await store.dispatch(signout(1));
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });
});

