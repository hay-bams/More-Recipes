import React from 'react';
import FavouriteRecipes from '../../containers/Favourite';
import DashboardNav from './DashboardNav';


const AddRecipePage = props => (
  <div>
    <DashboardNav {...props} />
    <FavouriteRecipes />
  </div>
);

export default AddRecipePage;
