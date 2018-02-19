import React from 'react';
import FavouriteRecipes from '../../containers/Favourite';
import DashboardNav from './DashboardNav';
import Footer from '../Footer';


const AddRecipePage = props => (
  <div>
    <DashboardNav {...props} />
    <FavouriteRecipes />
    <Footer />
  </div>
);

export default AddRecipePage;
