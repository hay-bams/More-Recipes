import moxios from 'moxios';
import reduxPromise from 'redux-promise';
import configureMockStore from 'redux-mock-store';

import APPCONSTANT from '../../constant';
import { addReview, getRecipeReviews } from '../../actions/review';
import { review, getReview, } from '../__mocks__/response/response';


const mockStore = configureMockStore([reduxPromise]);
describe('Review actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Add revieww', () => {
    test('Should dispatch addReview action when addReview action is called', async () => {
      moxios.wait(() => {
        const getRecipesRequest = moxios.requests.mostRecent();
        getRecipesRequest.respondWith({
          status: 200,
          response: review
        }); 
      });

      localStorage.userData = JSON.stringify({
        token: 'some_token'
      });

      const store = mockStore({});
      const expectedAction = {
        type: APPCONSTANT.ADD_REVIEW,
        payload: review
      };

      const userReview = {
        review: 'some review',
      };

      await store.dispatch(addReview(userReview, 1));
      expect(store.getActions()[0]).toEqual(expectedAction);
    });

    test('Should dispatch signout action when token expires', async () => {
      const tokenExpireResponse = {
        data: {
          error: {
            name: 'TokenExpiredError'
          }
        }
      }
      moxios.wait(() => {
        const getRecipesRequest = moxios.requests.mostRecent();
        getRecipesRequest.reject({
          status: 401,
          response: tokenExpireResponse
        });
      });

      localStorage.userData = JSON.stringify({
        token: 'some_token',
        user: { id: 1 }
      });

      const store = mockStore({});
      const userReview = {
        review: 'some review',
      };
      const expectedAction = {
        type: APPCONSTANT.SIGN_OUT,
        payload: null
      };
      await store.dispatch(addReview(userReview, 1));
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });

  describe('Get recipe review', () => {
    test('Should dispatch getRecipeReviews action when getRecipeReviews action is called', async () => {
      moxios.wait(() => {
        const getRecipesRequest = moxios.requests.mostRecent();
        getRecipesRequest.respondWith({
          status: 200,
          response: getReview
        });
      });

      localStorage.userData = JSON.stringify({
        token: 'some_token'
      }); 

      const store = mockStore({});
      const expectedAction = {
        type: APPCONSTANT.GET_RECIPES_REVIEWS,
        payload: getReview.data
      };

      await store.dispatch(getRecipeReviews(1));
      expect(store.getActions()[0]).toEqual(expectedAction);
    });

    test('Should dispatch signout action when token expires', async () => {
      const tokenExpireResponse = {
        data: {
          error: {
            name: 'TokenExpiredError'
          }
        }
      }
      moxios.wait(() => {
        const getRecipesRequest = moxios.requests.mostRecent();
        getRecipesRequest.reject({
          status: 401,
          response: tokenExpireResponse
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
      await store.dispatch(getRecipeReviews(1));
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });
});

