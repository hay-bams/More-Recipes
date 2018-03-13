import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { UserRecipes } from '../../containers/UserRecipes';

describe('Favourite Recipe Component', () => {
  const props = {
    getUserRecipes: jest.fn(),
    deleteRecipe: jest.fn(),
    userRecipes: [
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

  test('it should render Favourites correctly', () => {
    const wrapper = shallow(<UserRecipes {...props} />);
    expect(wrapper.find('img').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  test('it should render correctly if there are no favourites', () => {
    const userRecipes = [];
    const getUserRecipes = jest.fn();
    const deleteRecipe = jest.fn();
    const wrapper = shallow(<UserRecipes
      userRecipes={userRecipes}
      getUserRecipes={getUserRecipes}
      deleteRecipe={deleteRecipe}
    />);
    expect(wrapper.find('.text-center').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  test('it should call showModal on click', () => {
    const spy = sinon.spy(UserRecipes.prototype, 'showModal');
    const wrapper = shallow(<UserRecipes {...props} />);
    wrapper.find('button').simulate('click', {
      target: { id: 1 }, 
      preventDefault: () => {}
    });
    expect(spy.called).toBeTruthy();
  });
});
