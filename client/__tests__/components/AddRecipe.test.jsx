import React from 'react';
import { shallow } from 'enzyme';
import moxios from 'moxios';
import sinon from 'sinon';
import { AddRecipeForm } from '../../containers/AddRecipeForm';

describe('Add Recipe Component', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  const props = {
    addRecipe: jest.fn(() => Promise.resolve()),
    history: {
      push: jest.fn()
    }
  };

  test('it should render AddRecipeForm correctly', () => {
    const wrapper = shallow(<AddRecipeForm {...props} />);
    expect(wrapper.find('form').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  test('it should render error for empty ingredient in form submission', () => {
    const wrapper = shallow(<AddRecipeForm {...props} />);
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
    const wrapper = shallow(<AddRecipeForm {...props} />);
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
    const wrapper = shallow(<AddRecipeForm {...props} />);
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
    const wrapper = shallow(<AddRecipeForm {...props} />);
    wrapper.find('input').at(0).simulate('change', {
      target: { name, value },
      preventDefault: () => {}
    });
    expect(wrapper.state('title')).toBe(value);
  });

  test('should set ingredient state on input change', () => {
    const value = 'salt';
    const name = 'ingredient';
    const wrapper = shallow(<AddRecipeForm {...props} />);
    wrapper.find('input').at(0).simulate('change', {
      target: { name, value },
      preventDefault: () => {}
    });
    expect(wrapper.state('ingredient')).toBe(value);
  });

  test('should set instruction state on input change', () => {
    const value = 'how to cook rice';
    const name = 'instruction';
    const wrapper = shallow(<AddRecipeForm {...props} />);
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
    const wrapper = shallow(<AddRecipeForm
      {...props}
    />);
    wrapper.instance().handleDrop(files);
    expect(wrapper.instance().state.image).toEqual({
      name: 'file1', url: 'url'
    });
  });

  test('should call addRecipe for valid form submission', () => {
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
    const spy = sinon.spy(AddRecipeForm.prototype, 'addRecipe');
    const wrapper = shallow(<AddRecipeForm {...props} />);
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
  });
});

