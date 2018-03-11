import React from 'react';
import { shallow } from 'enzyme';
import { AddReview } from '../../containers/AddReview';

describe('', () => {
  const props = {
    addReview: jest.fn(),
    history: {
      push: jest.fn()
    },
    match: {
      params: {
        id: '1'
      }
    }
  };

  test('it should render AddReviewForm correctly', () => {
    const wrapper = shallow(<AddReview {...props} />);
    expect(wrapper.find('form').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  test('it should render error for empty review in form submission', () => {
    const wrapper = shallow(<AddReview {...props} />);
    wrapper.instance().setState({
      review: ''
    });
    wrapper.update();
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });
    expect(wrapper.state('reviewError').length).toBeGreaterThan(0);
  });


  test('should set review state on input change', () => {
    const value = 'some review';
    const name = 'review';
    const wrapper = shallow(<AddReview {...props} />);
    wrapper.find('textarea').simulate('change', {
      target: { name, value },
      preventDefault: () => {}
    });
    expect(wrapper.state('review')).toBe(value);
  });

  test('should call addReview prop for valid form submission', () => {
    const review = {
      review: 'some reviews'
    };
    const wrapper = shallow(<AddReview {...props} />);
    wrapper.instance().setState({
      review: 'some reviews'
    });
    wrapper.update();
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });

    expect(props.addReview).toHaveBeenLastCalledWith(review, 1);
  });
});

