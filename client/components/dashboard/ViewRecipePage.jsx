import React from 'react';
import DashboardNav from './DashboardNav';
import UserRecipes from '../../containers/UserRecipes';
import Footer from '../Footer';


const ViewRecipePage = props => (
  <div>
    <DashboardNav {...props}/>
    <UserRecipes />
    <Footer />
  </div>
);

export default ViewRecipePage;
