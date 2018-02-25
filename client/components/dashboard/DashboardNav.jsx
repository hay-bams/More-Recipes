import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const isSignedIn = (props) => {
  if (localStorage.userData === undefined) {
    props.history.push('/signin');
  }
};

const DashboardNav = props => (
  <header>
    {isSignedIn(props)}
    <nav className="navbar navbar-expand-md navbar-light fixed-top navigationBar">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">More Recipes</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse resetNav" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fa fa-user" /> {props.userData.user ? props.userData.user.firstName : ''}  <b className="caret" />
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/add_recipe">Add Recipes</Link>
                <Link className="dropdown-item" to="/view_recipes">View Recipes</Link>
                <div className="dropdown-divider" />
                <Link className="dropdown-item" to="/favourites">Favourite Recipes</Link>
                { props.userData.token ?
                  <Link className="dropdown-item" to={`/edit_user/${props.userData.user.id}`}>
                  Edit Profile
                  </Link> : ''
                }
                  { props.userData.token ?
                  <Link className="dropdown-item" to={`/edit_password/${props.userData.user.id}`}>
                  Edit Password
                  </Link> : ''
                }
                <div className="dropdown-divider" />
                <Link className="dropdown-item" to="/signoutPage">Sign out</Link>
              </div>
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

DashboardNav.defaultProps = {
  userData: {}
};

DashboardNav.propTypes = {
  userData: PropTypes.shape({
    user: PropTypes.shape({
      email: PropTypes.string,
      firstName: PropTypes.string,
      id: PropTypes.number,
      lastName: PropTypes.string
    })
  })
};

export default connect(mapStateToProps, null)(DashboardNav);
