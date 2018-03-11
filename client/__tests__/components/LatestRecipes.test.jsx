import React from 'react';
import { shallow } from 'enzyme';
import { LatestRecipes } from '../../containers/LatestRecipes';

describe('', () => {
  const props = {
    getLatestRecipes: jest.fn(),
    recipes: [
      {
        upvotes: 0,
        downvotes: 0,
        id: 1,
        title: 'titlw',
        image: 'image',
        instructions: 'instructions',
        ingredients: 'ingredients',
        userId: 1,
        createdAt: 'created date',
        updatedAt: 'updated date'
      }
    ]
  };

  test('it should render LatestRecipes correctly', () => {
    const wrapper = shallow(<LatestRecipes {...props} />);
    expect(wrapper.find('img').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});

