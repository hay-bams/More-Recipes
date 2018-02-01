import React from 'react';
import EditRecipeForm from '../../containers/EditRecipeForm';
import DashboardNav from './DashboardNav';

const EditRecipePage = props => (
  <div>
    <DashboardNav />
    <EditRecipeForm {...props} />
  </div>
);

export default EditRecipePage;
