import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navigation = props => (
  <header>
    <nav
      className="navbar navbar-expand-md navbar-light fixed-top navigationBar"
    >
      <div className="container">
        <NavLink to="/" className="navbar-brand">My Recipes</NavLink>
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

        <div
          className="collapse navbar-collapse resetNav"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active" />

            <li className="nav-item active">
              { props.userData === undefined ?
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
              { props.userData === undefined ?
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
  </header>
);

const mapStateToProps = state => ({
  userData: state.userData
});

Navigation.defaultProps = {
  userData: {}
};

Navigation.propTypes = {
  userData: PropTypes.shape({
    user: PropTypes.shape({
      email: PropTypes.string,
      firstName: PropTypes.string,
      id: PropTypes.number,
      lastName: PropTypes.string
    })
  })
};

export default connect(mapStateToProps, null)(Navigation);
