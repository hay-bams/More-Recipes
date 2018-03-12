import React from 'react';
import { shallow } from 'enzyme';
import { EditUserProfileForm } from '../../containers/EditUserProfileForm';

describe('Edit User Profile Component', () => {
  const props = {
    editUserProfile: jest.fn(),
    userData: {
      user: {
        email: 'testemail@gmail.com',
        firstName: 'Ayobami',
        lastName: 'Adelakun',
        id: 1
      }
    },
    errorMsg: '',
    match: {
      params: {
        id: '1'
      }
    }
  };

  test('it should render EditUserProfile form correctly', () => {
    const wrapper = shallow(<EditUserProfileForm {...props} />);
    expect(wrapper.find('form').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  test('it should render error for empty firstName in form submission', () => {
    const wrapper = shallow(<EditUserProfileForm {...props} />);
    wrapper.instance().setState({
      email: 'testemail@gmail.com',
      firstName: '',
      lastName: 'Adelakun',
    });
    wrapper.update();
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });
    expect(wrapper.state('firstNameError').length).toBeGreaterThan(0);
  });

  test('it should render error for empty lastName in form submission', () => {
    const wrapper = shallow(<EditUserProfileForm {...props} />);
    wrapper.instance().setState({
      email: 'testemail@gmail.com',
      firstName: 'Ayobami',
      lastName: ''
    });
    wrapper.update();
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });
    expect(wrapper.state('lastNameError').length).toBeGreaterThan(0);
  });

  test('it should render error for empty email in form submission', () => {
    const wrapper = shallow(<EditUserProfileForm {...props} />);
    wrapper.instance().setState({
      email: '',
      firstName: 'Ayobami',
      lastName: 'Adelakun',
    });
    wrapper.update();
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });
    expect(wrapper.state('emailError').length).toBeGreaterThan(0);
  });

  test('should set firstName state on input change', () => {
    const value = 'Ayobami';
    const name = 'firstName';
    const wrapper = shallow(<EditUserProfileForm {...props} />);
    wrapper.find('input').at(0).simulate('change', {
      target: { name, value },
      preventDefault: () => {}
    });
    expect(wrapper.state('firstName')).toBe(value);
  });

  test('should set lastName state on input change', () => {
    const value = 'Adelakun';
    const name = 'lastName';
    const wrapper = shallow(<EditUserProfileForm {...props} />);
    wrapper.find('input').at(1).simulate('change', {
      target: { name, value },
      preventDefault: () => {}
    });
    expect(wrapper.state('lastName')).toBe(value);
  });

  test('should set email state on input change', () => {
    const value = 'email@gmail.com';
    const name = 'email';
    const wrapper = shallow(<EditUserProfileForm {...props} />);
    wrapper.find('input').at(2).simulate('change', {
      target: { name, value },
      preventDefault: () => {}
    }); 
    expect(wrapper.state('email')).toBe(value);
  });

  test('should call editUserProfile prop for valid form submission', () => {
    const user = {
      email: 'testemail@gmail.com',
      firstName: 'Ayobami',
      lastName: 'Adelakun',
    };

    const wrapper = shallow(<EditUserProfileForm {...props} />);
    wrapper.instance().setState({
      email: 'testemail@gmail.com',
      firstName: 'Ayobami',
      lastName: 'Adelakun',
    });
    wrapper.update();
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });

    expect(props.editUserProfile).toHaveBeenLastCalledWith(
      user,
      props.match.params.id
    );
  });
});

