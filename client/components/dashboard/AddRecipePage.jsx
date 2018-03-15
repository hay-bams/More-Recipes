import React from 'react';
import { connect } from 'react-redux';
import ConnectedAddRecipeForm from '../../containers/AddRecipeForm';
import DashboardNav from './DashboardNav';

const AddRecipePage = props => (
  <div id="addRecipePage">
    <DashboardNav {...props} />
    <ConnectedAddRecipeForm {...props} />
  </div>
);

const mapStateToProps = state => ({
  userData: state.userData,
});

export default connect(mapStateToProps, null)(AddRecipePage);
