import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { editUserProfile } from '../actions/actions';
import Authenticate from '../auth/auth';

/**
 * @class EditRecipeForm
 */
class EditUserProfileForm extends React.Component {
  /**
   * @param {obj} props
   * @returns {void} constructor
   */
  constructor(props) {
    super(props);
    this.editProfile = this.editProfile.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      errors: {},
      user: {}
    };
  }

  /**
   * @returns {void} componentWillMount
   */
  componentWillMount() {
    const { user } = this.props.userData;
    this.setState({ user });
  }

  /**
   * @param {obj} event
   * @returns {void} onChange
   */
  onChange(event) {
    const user = {
      [event.target.name]: event.target.value
    };
    this.setState({ user });
  }

  /**
   * @param {obj} event
   * @returns {void} addRecipe
   */
  editProfile(event) {
    event.preventDefault();
    const user = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      password: event.target.password.value
    };

    let errors = Authenticate.validateUserSignup(user);

    if (errors.email !== '' || errors.password !== '' ||
       errors.firstName !== '' || errors.lastName !== '') {
      return this.setState({ errors });
    }
    this.props.editUserProfile(user, this.props.match.params.id);
    errors = {};
    this.setState({ errors });
  }

  /**
   * @returns {obj} render
   */
  render() {
    const { errors } = this.state;
    const { user } = this.state;
    return (
      <div className="container-fluid main-register-container">
        <div className="row overlay">
          <div className="col-sm-8 col-md-5 mx-auto">
            <div className="card  mt-5 card-form">
              <div className="card-header text-center">
                <h2 className="text-center"> Edit User Profile</h2>
              </div>
              <span>{this.props.errorMsg}</span>
              <div className="card-body">
                <form onSubmit={this.editProfile}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      placeholder="Enter First name"
                      value={user.firstName}
                      onChange={this.onChange}
                    />
                    { errors.firstName &&
                    <span className="help-block error text-danger">
                      {errors.firstName}
                    </span>
                      }
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      placeholder="Enter Last name"
                      value={user.lastName}
                      onChange={this.onChange}
                    />
                    { errors.lastName &&
                    <span className="help-block error text-danger">
                      {errors.lastName}
                    </span>
                      }
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter Email"
                      value={user.email}
                      onChange={this.onChange}
                    />
                    { errors.email &&
                    <span className="help-block error text-danger">
                      {errors.email}
                    </span>
                      }
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter Password"
                      value={user.password}
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
                      type="submit"
                      value="Update Profile"
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


EditUserProfileForm.defaultProps = {
  editUserProfile: {},
  userData: {},
  errorMsg: ''
};

EditUserProfileForm.propTypes = {
  editUserProfile: PropTypes.func,
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


const mapStateToProps = state => ({
  userData: state.userData,
  errorMsg: state.errors.signUpError
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ editUserProfile }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(EditUserProfileForm);
