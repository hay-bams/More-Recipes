import React from 'react';
import { shallow } from 'enzyme';
import { SigninForm } from '../../containers/SigninForm';


describe('Signin component', () => {
  const props = {
    signin: jest.fn(),
    userData: {
      email: 'test@gmail.com',
      firstName: 'Ayobami',
      id: '1',
      lastName: 'Adelakun'
    },
    redirectUser: {
      push: jest.fn()
    }
  };

  test('it should render signin form', () => {
    const wrapper = shallow(<SigninForm {...props} />);
    expect(wrapper.find('form').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  test('it should render error for invalid email in form submission', () => {
    const wrapper = shallow(<SigninForm {...props} />);
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });
    expect(wrapper.state('emailError').length).toBeGreaterThan(0);
  });

  test('it should render error for empty password in form submission', () => {
    const wrapper = shallow(<SigninForm {...props} />);
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });
    expect(wrapper.state('passwordError').length).toBeGreaterThan(0);
  });

  test('should set email state on input change', () => {
    const value = 'newemail@gmail.com';
    const name = 'email';
    const wrapper = shallow(<SigninForm {...props} />);
    wrapper.find('input').at(0).simulate('change', {
      target: { name, value },
      preventDefault: () => {}
    });

    expect(wrapper.state('email')).toBe(value);
  });

  test('should set password state on input change', () => {
    const name = 'password';
    const value = 'password';
    const wrapper = shallow(<SigninForm {...props} />);
    wrapper.find('input').at(0).simulate('change', {
      target: { name, value },
      preventDefault: () => {}
    });

    expect(wrapper.state('password')).toBe(value);
  });

  test('should call signin prop for valid form submission', () => {
    const signinInfo = {
      email: 'test@gmail.com',
      password: 'password'
    };
    const wrapper = shallow(<SigninForm {...props} />);
    wrapper.instance().setState({
      email: 'test@gmail.com',
      password: 'password',
    });
    wrapper.update();
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });

    expect(props.signin).toHaveBeenLastCalledWith(signinInfo);
  });
});

