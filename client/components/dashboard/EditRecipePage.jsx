import React from 'react';
import ConnectedEditRecipeForm from '../../containers/EditRecipeForm';
import DashboardNav from './DashboardNav';

const EditRecipePage = props => (
  <div>
    <DashboardNav {...props} />
    <ConnectedEditRecipeForm {...props} />
  </div>
);

export default EditRecipePage;
