import React from 'react';
import DashboardNav from './DashboardNav';
import UserRecipes from '../../containers/UserRecipes';
import Footer from '../Footer';

const AddRecipePage = () => (
  <div>
    <DashboardNav />
    <UserRecipes />
    <Footer />
  </div>
);

export default AddRecipePage;
