import React from 'react';
import EditRecipeForm from '../../containers/EditRecipeForm';
import DashboardNav from './DashboardNav';

const EditRecipePage = props => (
  <div>
    <DashboardNav {...props} />
    <EditRecipeForm {...props} />
  </div>
);

export default EditRecipePage;
