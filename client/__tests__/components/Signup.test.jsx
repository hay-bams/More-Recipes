import React from 'react';
import { shallow } from 'enzyme';
import { SignupForm } from '../../containers/SignupForm';


describe('Signin component', () => {
  const props = {
    signup: jest.fn(),
    userData: {
      user: {
        email: 'test@gmail.com',
        firstName: 'Ayobami',
        id: 1,
        lastName: 'Adelakun'
      }
    },
    redirectUser: {
      push: jest.fn()
    }
  };

 
  test('it should render SignupForm correctly', () => {
    const wrapper = shallow(<SignupForm {...props} />);
    expect(wrapper.find('form').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  test('it should render error for an empty email in form submission', () => {
    const wrapper = shallow(<SignupForm {...props} />);
    wrapper.instance().setState({
      email: '',
      password: 'password',
      firstName: 'Ayobami',
      lastName: 'Adelakun',
      confirmPassword: 'password'
    });
    wrapper.update();
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });
    expect(wrapper.state('emailError').length).toBeGreaterThan(0);
  });

  test('it should render error for empty password in form submission', () => {
    const wrapper = shallow(<SignupForm {...props} />);
    wrapper.instance().setState({
      email: 'email@gmail.com',
      password: '',
      firstName: 'Ayobami',
      lastName: 'Adelakun',
      confirmPassword: 'password'
    });
    wrapper.update();
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });
    expect(wrapper.state('passwordError').length).toBeGreaterThan(0);
  });


  test('it should render error for empty firstName in form submission', () => {
    const wrapper = shallow(<SignupForm {...props} />);
    wrapper.instance().setState({
      email: 'email@gmail.com',
      password: 'password',
      firstName: '',
      lastName: 'Adelakun',
      confirmPassword: 'password'
    });
    wrapper.update();
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });
    expect(wrapper.state('firstNameError').length).toBeGreaterThan(0);
  });

  test('it should render error for empty firstName in form submission', () => {
    const wrapper = shallow(<SignupForm {...props} />);
    wrapper.instance().setState({
      email: 'email@gmail.com',
      password: 'password',
      firstName: 'Ayobami',
      lastName: '',
      confirmPassword: 'password'
    });
    wrapper.update();
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });
    expect(wrapper.state('lastNameError').length).toBeGreaterThan(0);
  });

  test('should set firstName state on input change', () => {
    const value = 'Ayobami';
    const name = 'firstName';
    const wrapper = shallow(<SignupForm {...props} />);
    wrapper.find('input').at(0).simulate('change', {
      target: { name, value },
      preventDefault: () => {}
    });

    expect(wrapper.state('firstName')).toBe(value);
  });

  test('should set lastName state on input change', () => {
    const value = 'Adelakun';
    const name = 'lastName';
    const wrapper = shallow(<SignupForm {...props} />);
    wrapper.find('input').at(0).simulate('change', {
      target: { name, value },
      preventDefault: () => {}
    });

    expect(wrapper.state('lastName')).toBe(value);
  });

  test('should set email state on input change', () => {
    const value = 'email@gmail.com';
    const name = 'email';
    const wrapper = shallow(<SignupForm {...props} />);
    wrapper.find('input').at(0).simulate('change', {
      target: { name, value },
      preventDefault: () => {}
    });

    expect(wrapper.state('email')).toBe(value);
  });

  test('should set password state on input change', () => {
    const name = 'password';
    const value = 'password';
    const wrapper = shallow(<SignupForm {...props} />);
    wrapper.find('input').at(0).simulate('change', {
      target: { name, value },
      preventDefault: () => {}
    });

    expect(wrapper.state('password')).toBe(value);
  });

  test('should set confirmPassword state on input change', () => {
    const name = 'confirmPassword';
    const value = 'password';
    const wrapper = shallow(<SignupForm {...props} />);
    wrapper.find('input').at(0).simulate('change', {
      target: { name, value },
      preventDefault: () => {}
    });

    expect(wrapper.state('confirmPassword')).toBe(value);
  });

  test('should call signup prop for valid form submission', () => {
    const signupInfo = {
      email: 'email@gmail.com',
      password: 'password',
      firstName: 'Ayobami',
      lastName: 'Adelakun',
      confirmPassword: 'password'
    };
    const wrapper = shallow(<SignupForm {...props} />);
    wrapper.instance().setState({
      email: 'email@gmail.com',
      password: 'password',
      firstName: 'Ayobami',
      lastName: 'Adelakun',
      confirmPassword: 'password'
    });
    wrapper.update();
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });

    expect(props.signup).toHaveBeenLastCalledWith(signupInfo);
  });
});

