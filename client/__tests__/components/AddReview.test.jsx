import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { AddReview } from '../../containers/AddReview';

describe('Add Review Component', () => {
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

  test('should call addReview for valid form submission', () => {
    const spy = sinon.spy(AddReview.prototype, 'addReview');
    localStorage.setItem('userData', {});
    const wrapper = shallow(<AddReview {...props} />);
    wrapper.instance().setState({
      review: 'some reviews'
    });
    wrapper.update();
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });
    expect(spy.called).toBeTruthy();
  });
});

