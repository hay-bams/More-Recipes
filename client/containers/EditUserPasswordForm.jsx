import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { editUserPassword } from '../actions/actions';
import Authenticate from '../auth/auth';

/**
 * @class EditRecipeForm
 */
class EditUserPasswordForm extends React.Component {
  /**
   * @param {obj} props
   * @returns {void} constructor
   */
  constructor(props) {
    super(props);
    this.editPassword = this.editPassword.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      errors: {},
      user: {},
      password: '',
      confirmPassword: ''
    };
  }

  /**
   * @param {obj} event
   * @returns {void} onChange
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @param {obj} event
   * @returns {void} addRecipe
   */
  editPassword(event) {
    event.preventDefault();
    const user = {
      password: event.target.password.value
    };

    let errors = Authenticate.validatePassword(user, this.state.confirmPassword);

    if (errors.password !== '' || errors.confirmPassword !== '') {
      return this.setState({ errors });
    }
    this.props.editUserPassword(user, this.props.match.params.id);
    errors = {};
    this.setState({ errors });
  }

  /**
   * @returns {obj} render
   */
  render() {
    const { errors } = this.state;
    return (
      <div className="container-fluid main-register-container">
        <div className="row overlay">
          <div className="col-sm-8 col-md-5 mx-auto">
            <div className="card  mt-5 card-form">
              <div className="card-header text-center">
                <h2 className="text-center"> Edit Password</h2>
              </div>
              <span>{this.props.errorMsg}</span>
              <div className="card-body">
                <form onSubmit={this.editPassword}>

                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter New Password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                    { errors.password &&
                    <span className="help-block error text-danger">
                      {errors.password}
                    </span>
                      }
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Confirm Password"
                      value={this.state.confirmPassword}
                      onChange={this.onChange}
                    />
                    { errors.confirmPassword &&
                    <span className="help-block error text-danger">
                      {errors.confirmPassword}
                    </span>
                      }
                  </div>

                  <div className="form-group">
                    <input
                      type="submit"
                      value="Update Password"
                      className="btn btn-success btn-block"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


EditUserPasswordForm.defaultProps = {
  editUserPassword: {},
  userData: {},
  errorMsg: ''
};

EditUserPasswordForm.propTypes = {
  editUserPassword: PropTypes.func,
  userData: PropTypes.shape({
    user: PropTypes.shape({
      email: PropTypes.string,
      firstName: PropTypes.string,
      id: PropTypes.number,
      lastName: PropTypes.string
    })
  }),
  errorMsg: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired
};


const mapDispatchToProps = dispatch =>
  bindActionCreators({ editUserPassword }, dispatch);

export default connect(null, mapDispatchToProps)(EditUserPasswordForm);
