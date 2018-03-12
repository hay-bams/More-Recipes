import React from 'react';
import { shallow } from 'enzyme';
import { Navigation } from '../../components/Navigation';

describe('Navigation', () => {
  const props = {
    location: {
      pathname: ''
    }
  };
  test('should render Navigation correctly', () => {
    const wrapper = shallow(<Navigation location={props.location} />); 
    expect(wrapper).toMatchSnapshot();
  });
});
 