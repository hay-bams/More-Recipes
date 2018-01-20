import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardNav from './DashboardNav';

/**
 * @class DashboardPage
 */
class DashboardPage extends React.Component {
  /**
   * @returns {void} componentWillMount
   */
  componentWillMount() {
    if (Object.keys(this.props.userData).length === 0) {
      this.props.history.push('/signin');
    }
  }

  /**
   * @returns {obj} render
   */
  render() {
    return (
      <div>
        <DashboardNav />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  userData: state.userData,
  recipes: state.recipes
});

DashboardPage.propTypes = {
  userData: PropTypes.shape({
    user: PropTypes.shape({
      email: PropTypes.string,
      firstName: PropTypes.string,
      id: PropTypes.number,
      lastName: PropTypes.string
    })
  }),
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

DashboardPage.defaultProps = {
  userData: {}
};

export default connect(mapStateToProps)(DashboardPage);
