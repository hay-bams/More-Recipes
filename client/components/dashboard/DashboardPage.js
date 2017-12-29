import React from 'react';
import { connect } from 'react-redux';
import DashboardNav from './DashboardNav';

/**
 * @class DashboardPage
 */
class DashboardPage extends React.Component {
  componentWillMount() {  
    this.props.user.userData == undefined ? this.props.history.push('/signin') : "";                                                                                                        
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