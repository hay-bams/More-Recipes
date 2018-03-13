import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { FavouriteRecipes } from '../../containers/Favourite';

describe('Favourite Recipe Component', () => {
  const props = {
    getFavouriteRecipes: jest.fn(),
    deleteFavoriteRecipe: jest.fn(),
    favouriteRecipes: [
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
    ],
    pages: 1
  };

  test('it should render Favourites correctly', () => {
    const wrapper = shallow(<FavouriteRecipes {...props} />);
    expect(wrapper.find('img').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  test('it should render correctly if there are no favourites', () => {
    const favouriteRecipes = [];
    const getFavouriteRecipes = jest.fn();
    const deleteFavoriteRecipe = jest.fn();
    const wrapper = shallow(<FavouriteRecipes
      favouriteRecipes={favouriteRecipes}
      getFavouriteRecipes={getFavouriteRecipes}
      deleteFavoriteRecipe={deleteFavoriteRecipe}
    />);
    expect(wrapper.find('.text-center').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  test('it should call showModal on click', () => {
    const spy = sinon.spy(FavouriteRecipes.prototype, 'showModal');
    const wrapper = shallow(<FavouriteRecipes {...props} />);
    wrapper.find('button').simulate('click', {
      target: { id: 1 }, 
      preventDefault: () => {}
    });
    expect(spy.called).toBeTruthy();
  });
});

