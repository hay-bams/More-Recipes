import React from 'react';
import { connect } from 'react-redux';
import AddRecipeForm from '../../containers/AddRecipeForm';
import DashboardNav from './DashboardNav';

const validateUser = (props) => {
  if (props.userData.token === undefined) {
    props.history.push('/signin');
  }
};

const AddRecipePage = props => (
  <div>
    {validateUser(props)}
    <DashboardNav />
    <AddRecipeForm />
  </div>
);

const mapStateToProps = state => ({
  userData: state.userData,
});

export default connect(mapStateToProps, null)(AddRecipePage);
