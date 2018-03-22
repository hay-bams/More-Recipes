import moxios from 'moxios';
import reduxPromise from 'redux-promise';
import configureMockStore from 'redux-mock-store';

import APPCONSTANT from '../../constant';
import { signup, signin, editUserProfile, editUserPassword, getUsers,
  signout } from '../../actions/user';

import { userData, updatedUserData, updateUserPassword,
  allUsers } from '../__mocks__/response/response';


const mockStore = configureMockStore([reduxPromise]);
describe('User actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Sign up a user', () => {
    test('Should dispatch signup action', async () => {
      moxios.wait(() => {
        const getUserRequest = moxios.requests.mostRecent();
        getUserRequest.respondWith({
          status: 201,
          response: userData
        });
      });

      const store = mockStore({});
      const { user, token } = userData;
      const expectedAction = {
        type: APPCONSTANT.SIGN_UP,
        payload: {
          user, token
        }
      };
      await store.dispatch(signup());
      expect(store.getActions()[0]).toEqual(expectedAction);
    });

    test('Should dispatch signout action when token expires', async () => {
      const tokenExpireResponse = {
        data: {
          error: {
            name: 'TokenExpiredError'
          }
        }
      };
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
      await store.dispatch(signup());
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });

  describe('Sign in a user', () => {
    test('Should dispatch signin action', async () => {
      moxios.wait(() => {
        const getUserRequest = moxios.requests.mostRecent();
        getUserRequest.respondWith({
          status: 201,
          response: userData
        });
      });

      const store = mockStore({});
      const { user, token } = userData;
      const expectedAction = {
        type: APPCONSTANT.SIGN_IN,
        payload: {
          user, token
        }
      };
      await store.dispatch(signin());
      expect(store.getActions()[0]).toEqual(expectedAction);
    });

    test('Should dispatch signout action when token expires', async () => {
      const tokenExpireResponse = {
        data: {
          error: {
            name: 'TokenExpiredError'
          }
        }
      };
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
      await store.dispatch(signin());
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });

  describe('Edit user profile', () => {
    test('Should dispatch editUserProfile action', async () => {
      moxios.wait(() => {
        const getUserRequest = moxios.requests.mostRecent();
        getUserRequest.respondWith({
          status: 200,
          response: updatedUserData
        });
      });

      localStorage.userData = JSON.stringify({
        token: 'some_token'
      });

      const store = mockStore({});
      const expectedAction = {
        type: APPCONSTANT.EDIT_USER_PROFILE,
        payload: {
          user: updatedUserData.user,
          token: updatedUserData.token
        }
      };
      const newUser = {
        firstName: 'Ayobami'
      };
      await store.dispatch(editUserProfile(newUser, 1));
      expect(store.getActions()[0]).toEqual(expectedAction);
    });

    test('Should dispatch signout action when token expires', async () => {
      const tokenExpireResponse = {
        data: {
          error: {
            name: 'TokenExpiredError'
          }
        }
      };
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
      const newUser = {
        firstName: 'Ayobami'
      };
      await store.dispatch(editUserProfile(newUser, 1));
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });

  describe('Edit user password', () => {
    test('Should dispatch editUserPassword action', async () => {
      moxios.wait(() => {
        const getUserRequest = moxios.requests.mostRecent();
        getUserRequest.respondWith({
          status: 200,
          response: updateUserPassword
        });
      });

      localStorage.userData = JSON.stringify({
        token: 'some_token'
      });

      const store = mockStore({});
      const expectedAction = {
        type: APPCONSTANT.EDIT_USER_PASSWORD,
        payload: updateUserPassword
      };
      const newUser = {
        firstName: 'Ayobami'
      };
      await store.dispatch(editUserPassword(newUser, 1));
      expect(store.getActions()[0]).toEqual(expectedAction);
    });

    test('Should dispatch signout action when token expires', async () => {
      const tokenExpireResponse = {
        data: {
          error: {
            name: 'TokenExpiredError'
          }
        }
      };
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
      const newUser = {
        password: 'password'
      };
      await store.dispatch(editUserPassword(newUser, 1));
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });

  describe('Get all users', () => {
    test(
      'Should dispatch getUsers action when getUsers action is called',
      async () => {
        moxios.wait(() => {
          const getUserRequest = moxios.requests.mostRecent();
          getUserRequest.respondWith({
            status: 200,
            response: allUsers
          });
        });

        localStorage.userData = JSON.stringify({
          token: 'some_token'
        });

        const store = mockStore({});
        const expectedAction = {
          type: APPCONSTANT.FIND_USERS,
          payload: allUsers
        };

        await store.dispatch(getUsers());
        expect(store.getActions()[0]).toEqual(expectedAction);
      }
    );

    test('Should dispatch signout action when token expires', async () => {
      const tokenExpireResponse = {
        data: {
          error: {
            name: 'TokenExpiredError'
          }
        }
      };
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

      await store.dispatch(getUsers());
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });

  describe('signout user', () => {
    test('Should dispatch signOut action when signOut is called', async () => {
      moxios.wait(() => {
        const getUserRequest = moxios.requests.mostRecent();
        getUserRequest.respondWith({
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

