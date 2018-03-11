import React from 'react';
import ConnectedFavouriteRecipe from '../../containers/Favourite';
import DashboardNav from './DashboardNav';
import Footer from '../Footer';

const AddRecipePage = props => (
  <div>
    <DashboardNav {...props} />
    <ConnectedFavouriteRecipe />
    <Footer />
  </div>
);

export default AddRecipePage;
