import React from 'react';
import { Link } from 'react-router-dom';
import AddRecipeForm from '../../containers/AddRecipeForm';
import DashboardNav from './DashboardNav';

/**
 * @class AddRecipePage
 */
class AddRecipePage extends React.Component {
  render() {
    return (
      <div>
        <DashboardNav />
        <AddRecipeForm />
      </div>
    )
  }
}

export default AddRecipePage;