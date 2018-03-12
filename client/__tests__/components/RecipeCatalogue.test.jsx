import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { RecipeCatalogue } from '../../containers/RecipesCatalogue';

describe('Latest Recipe Component', () => {
  const props = {
    getAllRecipes: jest.fn(),
    searchRecipes: jest.fn(),
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

  test('it should render recipeCatalogue correctly', () => {
    const wrapper = shallow(<RecipeCatalogue {...props} />);
    expect(wrapper.find('RecipeCard').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
 
  test('should set recipeSearch state on input change', () => {
    const value = 'pepper';
    const name = 'recipeSearch';
    const wrapper = shallow(<RecipeCatalogue {...props} />);
    wrapper.find('input').simulate('change', {
      target: { name, value },
      preventDefault: () => {}
    });
    expect(wrapper.state('recipeSearch')).toBe(value);
  });

  test('should call searchRecipes prop on change', () => {
    const value = 'pepper';
    const name = 'recipeSearch';
    const wrapper = shallow(<RecipeCatalogue {...props} />);
    wrapper.instance().setState({
      page: 1,
      sort: 'upvotes',
      order: 'asc'
    });
    wrapper.update();
    wrapper.find('input').simulate('onchange', {
      target: { name, value },
      preventDefault: () => {}
    });
  
    expect(props.searchRecipes).toHaveBeenCalledTimes(1);
  });

  test('it should call onSelect when sort changes', () => {
    const name = 'sort';
    const value = 'upvotes';
    const spy = sinon.spy(RecipeCatalogue.prototype, 'onSelect');
    const wrapper = shallow(<RecipeCatalogue {...props} />);
    wrapper.find('.form-group.col-sm-6').at(0).simulate('change', {
      target: { name, value },
      preventDefault: () => {}
    });
    expect(spy.called).toBeTruthy();
    RecipeCatalogue.prototype.onSelect.restore()
  });

  test('it should call onSelect when order changes', () => {
    const name = 'order';
    const value = 'asc';
    const spy = sinon.spy(RecipeCatalogue.prototype, 'onSelect');
    const wrapper = shallow(<RecipeCatalogue {...props} />);
    wrapper.find('.form-group.col-sm-6').at(1).simulate('change', {
      target: { name, value },
      preventDefault: () => {}
    });
    expect(spy.called).toBeTruthy();
  });
});
 