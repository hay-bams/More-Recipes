import React from 'react';
import { connect } from 'react-redux';
import DashboardNav from './DashboardNav';

/**
 * @class DashboardPage
 */
class DashboardPage extends React.Component {
  componentWillMount() {
    console.log(this.props.user)
    this.props.user.userData == undefined ? this.props.history.push('/signup') : "";                                                                                                        
  }

  render() {
    return (
      <div>
        <DashboardNav />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    recipes: state.recipes
  }
}

export default connect(mapStateToProps)(DashboardPage);