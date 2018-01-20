import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const HomePageNavigation = props => (
  <nav className="navbar navbar-expand-md navbar-light fixed-top navigationBar">
    <div className="container-fluid">
      <NavLink to="/" className="navbar-brand">My Recipe Logo</NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/catalogue" className="nav-link">Catalogue</NavLink>
          </li>


          <li className="nav-item active">
            { Object.keys(props.userData).length === 0 ?
              <NavLink
                to="/signin"
                className="nav-link"
                href="login.html"
              >Sign in
                <span className="sr-only">(current)</span>
              </NavLink> : ''
            }
          </li>

          <li className="nav-item">
            { Object.keys(props.userData).length === 0 ?
              <NavLink
                to="/signup"
                className="nav-link"
                href="register.html"
              >Sign up
              </NavLink> : ''
            }
          </li>

        </ul>
      </div>
    </div>
  </nav>
);

const mapStateToProps = state => ({
  userData: state.userData
});

// HomePageNavigation.defaultProps = {
//   userData: {}
// };

HomePageNavigation.propTypes = {
  userData: PropTypes.shape({
    user: PropTypes.shape({
      email: PropTypes.string,
      firstName: PropTypes.string,
      id: PropTypes.number,
      lastName: PropTypes.string
    })
  }).isRequired
};

export default connect(mapStateToProps, null)(HomePageNavigation);
