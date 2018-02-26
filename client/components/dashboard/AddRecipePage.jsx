import React from 'react';
import { connect } from 'react-redux';
import AddRecipeForm from '../../containers/AddRecipeForm';
import DashboardNav from './DashboardNav';

const AddRecipePage = props => (
  <div>
    <DashboardNav {...props} />
    <AddRecipeForm {...props}/>
  </div>
);

const mapStateToProps = state => ({
  userData: state.userData,
});

export default connect(mapStateToProps, null)(AddRecipePage);
