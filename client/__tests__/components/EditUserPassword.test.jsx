import React from 'react';
import { shallow } from 'enzyme';
import { EditUserPasswordForm } from '../../containers/EditUserPasswordForm';

describe('', () => {
  const props = {
    editUserPassword: jest.fn(),
    errorMsg: '',
    match: {
      params: {
        id: '1'
      }
    }
  };

  test('it should render EditRecipe form', () => {
    const wrapper = shallow(<EditUserPasswordForm {...props} />);
    expect(wrapper.find('form').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  test('it should render error for empty password in form submission', () => {
    const wrapper = shallow(<EditUserPasswordForm {...props} />);
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });
    expect(wrapper.state('passwordError').length).toBeGreaterThan(0);
  });

  test('should set password state on input change', () => {
    const value = 'password';
    const name = 'password';
    const wrapper = shallow(<EditUserPasswordForm {...props} />);
    wrapper.find('input').at(0).simulate('change', {
      target: { name, value },
      preventDefault: () => {}
    });
    expect(wrapper.state('password')).toBe(value);
  });

  test('should call editRecipe prop for valid form submission', () => {
    const newPassword = {
      password: 'password'
    };

    const wrapper = shallow(<EditUserPasswordForm {...props} />);
    wrapper.instance().setState({
      password: 'password',
      confirmPassword: 'password'
    });
    wrapper.update();
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });

    expect(props.editUserPassword).toHaveBeenLastCalledWith(
      newPassword,
      props.match.params.id
    );
  });
});

