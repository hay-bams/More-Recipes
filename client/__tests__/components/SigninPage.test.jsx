import React from 'react';
import { shallow } from 'enzyme';
import { SigninPage } from '../../components/signin/SigninPage';

describe('Sign in page', () => {
  test('it should render correctly', () => {
    const props = {
      history: {
        push: jest.fn()
      }
    };

    const wrapper = shallow(<SigninPage {...props} />);
    expect(wrapper.find('Navigation').length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});
 