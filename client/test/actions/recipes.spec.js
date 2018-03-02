import moxios from 'moxios';
import reduxPromise from 'redux-promise';
import configureMockStore from 'redux-mock-store';

import APPCONSTANT from '../../constant';
import { addRecipe } from '../../actions/actions';

const mockStore = configureMockStore([reduxPromise]);

describe('The recipe actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  const recipeResponse = {
    success: true,
    message: 'Recipe Created Successfully',
    data: {
      upvotes: 0,
      downvotes: 0,
      id: 138,
      views: 0,
      userViews: 0,
      title: 'title',
      image: 'image',
      instructions: 'instructiona',
      ingredients: 'ingredeints',
      userId: 16,
      updatedAt: '2018-02-14T23:10:14.931Z',
      createdAt: '2018-02-14T23:10:14.931Z'
    }
  };

  test('Should dispatch createRecipe action when addRecipe is called', async () => {
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
