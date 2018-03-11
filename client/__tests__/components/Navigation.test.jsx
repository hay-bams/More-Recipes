import React from 'react';
import { shallow } from 'enzyme';
import { Navigation } from '../../components/Navigation';
// import toJSON from 'enzyme-to-json';

describe('Navigation', () => {
  test('should render Navigation correctly', () => {
    const wrapper = shallow(<Navigation location={{}} />);
    expect(wrapper).toMatchSnapshot();
  });
});
