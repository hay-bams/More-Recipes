import React from 'react';
import { shallow } from 'enzyme';
import { RecipeReviews } from '../../containers/RecipeReviews';

describe('Recipe Details Component', () => {
  const props = {
    userData: {
      user: {
        id: 1
      }
    },
    getUsers: jest.fn(),
    getRecipeReviews: jest.fn(),
    upvoteRecipe: jest.fn(),
    downvoteRecipe: jest.fn(),
    allUsers: [
      {
        id: 1,
        firstName: 'Ayobami',
        lastName: 'Adelakun',
        email: 'email@gmail.com'
      }
    ],
    userReviews: [
      {
        id: 1,
        userId: 1,
        recipeId: 1,
        review: 'some review',
        createdAt: 'created date',
        updatedAt: 'updated date'
      }
    ],
    match: {
      params: {
        id: '1'
      }
    }
  }; 


  test('it should render RecipeRevews correctly', () => {
    const wrapper = shallow(<RecipeReviews {...props} />);
    expect(wrapper.find('Gravatar').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
