import React from 'react';
import ConnectedEditRecipeForm from '../../containers/EditRecipeForm';
import DashboardNav from './DashboardNav';

const EditRecipePage = props => (
  <div id="editRecipePage">
    <DashboardNav {...props} />
    <ConnectedEditRecipeForm {...props} />
  </div>
);

export default EditRecipePage;
