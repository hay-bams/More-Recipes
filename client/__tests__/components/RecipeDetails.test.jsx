import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { RecipeDetails } from '../../containers/RecipeDetails';

describe('Recipe Details Component', () => {
  const props = {
    userData: {
      user: {
        id: 1
      }
    },
    addFavoriteRecipe: jest.fn(),
    getSingleRecipe: jest.fn(),
    upvoteRecipe: jest.fn(),
    downvoteRecipe: jest.fn(),
    recipe: {
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
    },
    match: {
      params: {
        id: '1'
      }
    },
    history: {
      push: jest.fn()
    }
  };

  test('it should render Favourites correctly', () => {
    const wrapper = shallow(<RecipeDetails {...props} />);
    expect(wrapper.find('img').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });


  test('it should call upvote method on click', () => {
    const spy = sinon.spy(RecipeDetails.prototype, 'upvote');
    const wrapper = shallow(<RecipeDetails {...props} />);
    wrapper.find('a').at(0).simulate('click', {
      preventDefault: () => {}
    });
    expect(spy.called).toBeTruthy();
  });

  test('it should call downvote method on click', () => {
    const spy = sinon.spy(RecipeDetails.prototype, 'downvote');
    const wrapper = shallow(<RecipeDetails {...props} />);
    wrapper.find('a').at(1).simulate('click', {
      preventDefault: () => {} 
    });
    expect(spy.called).toBeTruthy();
  });

  test('it should call addFavourite method on click', () => {
    const spy = sinon.spy(RecipeDetails.prototype, 'addFavourite');
    const wrapper = shallow(<RecipeDetails {...props} />);
    wrapper.find('a').at(2).simulate('click', {
      preventDefault: () => {}
    });
    expect(spy.called).toBeTruthy();
  });


  // test('upvoteRecipe props has been called on click', () => {
  //   const wrapper = shallow(<RecipeDetails {...props} />);
  //   wrapper.find('a').at(0).simulate('click', {
  //     preventDefault: () => {}
  //   });

  //   expect(props.upvoteRecipe).toHaveBeenCalled();
  // });

  // test('downVoteRecipe props has been called on click', () => {
  //   const wrapper = shallow(<RecipeDetails {...props} />);
  //   wrapper.find('a').at(1).simulate('click', {
  //     preventDefault: () => {}
  //   });

  //   expect(props.downvoteRecipe).toHaveBeenCalled();
  // });

  // test('addFavourite props has been called on click', () => {
  //   const wrapper = shallow(<RecipeDetails {...props} />);
  //   wrapper.find('a').at(2).simulate('click', {
  //     preventDefault: () => {}
  //   });

  //   expect(props.addFavoriteRecipe).toHaveBeenCalled();
  // });
});
