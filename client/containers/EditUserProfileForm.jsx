import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { editUserProfile } from '../actions/user';
import Authenticate from '../auth/auth';

/**
 * @class EditRecipeForm
 */
export class EditUserProfileForm extends React.Component {
  /**
   * @param {obj} props
   * @returns {void} constructor
   */
  constructor(props) {
    super(props);
    this.editProfile = this.editProfile.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      firstNameError: '',
      lastNameError: '',
      emailError: ''
    };
  }

  /**
   * @returns {void} componentWillMount
   */
  componentWillMount() {
    const { user } = this.props.userData;
    this.setState({ firstName: user.firstName });
    this.setState({ lastName: user.lastName });
    this.setState({ email: user.email });
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
  editProfile(event) {
    event.preventDefault();
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email
    };

    const errors = Authenticate.validateUserProfile(user);

    if (errors.email !== '' || errors.firstName !== ''
      || errors.lastName !== '') {
      return this.setState({
        firstNameError: errors.firstName,
        lastNameError: errors.lastName,
        emailError: errors.email
      });
    }
    this.props.editUserProfile(user, this.props.match.params.id);

    this.setState({
      firstNameError: '',
      lastNameError: '',
      emailError: ''
    });
  }

  /**
   * @returns {obj} render
   */
  render() {
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
                      value={this.state.firstName}
                      onChange={this.onChange}
                    />
                    { this.state.firstNameError &&
                    <span className="help-block error text-danger">
                      {this.state.firstNameError}
                    </span>
                      }
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      placeholder="Enter Last name"
                      value={this.state.lastName}
                      onChange={this.onChange}
                    />
                    { this.state.lastNameError &&
                    <span className="help-block error text-danger">
                      {this.state.lastNameError}
                    </span>
                      }
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter Email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                    { this.state.emailError &&
                    <span className="help-block error text-danger">
                      {this.state.emailError}
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

const ConnectedEditUserProfileForm =
  connect(mapStateToProps, mapDispatchToProps)(EditUserProfileForm);


export default ConnectedEditUserProfileForm;
