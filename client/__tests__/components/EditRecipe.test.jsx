import React from 'react';
import { shallow } from 'enzyme';
import moxios from 'moxios';
import sinon from 'sinon';
import { EditRecipeForm } from '../../containers/EditRecipeForm';

describe('Edit Recipe Component', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  const props = {
    editRecipe: jest.fn(() => Promise.resolve()), 
    getSingleRecipe: jest.fn(),
    recipe: {
      id: 1,
      title: 'title',
      image: 'image',
      instructions: 'instructions',
      ingredients: 'ingredients',
    },
    history: {
      push: jest.fn()
    },
    match: {
      params: {
        id: '1'
      }
    }
  };

  test('it should render EditRecipeform', () => {
    const wrapper = shallow(<EditRecipeForm {...props} />);
    expect(wrapper.find('form').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  test('it should render error for empty ingredient in form submission', () => {
    const wrapper = shallow(<EditRecipeForm {...props} />);
    wrapper.instance().setState({
      title: 'title',
      ingredients: '',
      instructions: 'instructions'
    });
    wrapper.update();
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });
    expect(wrapper.state('ingredientError').length).toBeGreaterThan(0);
  });

  test('should render error for empty instructions in form submission', () => {
    const wrapper = shallow(<EditRecipeForm {...props} />);
    wrapper.instance().setState({
      title: 'title',
      ingredients: 'ingredients',
      instructions: ''
    });
    wrapper.update();
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });
    expect(wrapper.state('instructionError').length).toBeGreaterThan(0);
  });

  test('it should render error for empty title in form submission', () => {
    const wrapper = shallow(<EditRecipeForm {...props} />);
    wrapper.instance().setState({
      title: '',
      ingredients: 'ingredients',
      instructions: 'instructions'
    });
    wrapper.update();
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });
    expect(wrapper.state('titleError').length).toBeGreaterThan(0);
  });

  test('should set title state on input change', () => {
    const value = 'rice';
    const name = 'title';
    const wrapper = shallow(<EditRecipeForm {...props} />);
    wrapper.find('input').at(0).simulate('change', {
      target: { name, value },
      preventDefault: () => {}
    });
    expect(wrapper.state('title')).toBe(value);
  });

  test('should set ingredient state on input change', () => {
    const value = 'salt';
    const name = 'ingredient';
    const wrapper = shallow(<EditRecipeForm {...props} />);
    wrapper.find('input').at(1).simulate('change', {
      target: { name, value },
      preventDefault: () => {}
    });
    expect(wrapper.state('ingredient')).toBe(value);
  });

  test('should set instruction state on input change', () => {
    const value = 'how to cook rice';
    const name = 'instruction';
    const wrapper = shallow(<EditRecipeForm {...props} />);
    wrapper.find('textarea').simulate('change', {
      target: { name, value },
      preventDefault: () => {}
    });
    expect(wrapper.state('instruction')).toBe(value);
  });

  test('should set uploaded files to state', () => {
    const files = [
      {
        name: 'file1',
        url: 'url'
      }
    ];
    const wrapper = shallow(<EditRecipeForm
      {...props}
    />);
    wrapper.instance().handleDrop(files);
    expect(wrapper.instance().state.image).toEqual({
        name: 'file1', url: 'url'
    });
  });

  test('should call editRecipe for valid form submission', () => {
    const response = {
      secure_url: 'image_url'
    };

    moxios.stubRequest(
      'https://api.cloudinary.com/v1_1/dsj9ygnq2/upload',
      {
        status: 200,
        response
      }
    ); 
    const spy = sinon.spy(EditRecipeForm.prototype, 'editRecipe');
    const wrapper = shallow(<EditRecipeForm {...props} />);
    wrapper.instance().setState({
      title: 'title',
      ingredients: 'ingredients',
      instructions: 'instructions'
    });
    wrapper.update();
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });

    expect(spy.called).toBeTruthy();
    EditRecipeForm.prototype.editRecipe.restore()
  });

  test('should call editRecipe when image is not changed', () => {
    const response = {
      secure_url: 'image_url'
    };

    moxios.stubRequest(
      'https://api.cloudinary.com/v1_1/dsj9ygnq2/upload',
      {
        status: 200,
        response
      }
    ); 
    const spy = sinon.spy(EditRecipeForm.prototype, 'editRecipe');
    const wrapper = shallow(<EditRecipeForm {...props} />);
    wrapper.instance().setState({
      image: 'image', 
      title: 'title',
      ingredients: 'ingredients',
      instructions: 'instructions'
    });
    wrapper.update();
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });

    expect(spy.called).toBeTruthy();
  });
});

