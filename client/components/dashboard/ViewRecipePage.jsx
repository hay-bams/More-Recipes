import React from 'react';
import DashboardNav from './DashboardNav';
import ConnectedUserRecipes from '../../containers/UserRecipes';
import Footer from '../Footer';


const ViewRecipePage = props => (
  <div>
    <DashboardNav {...props}/>
    <ConnectedUserRecipes {...props}/>
    <Footer />
  </div>
);

export default ViewRecipePage;
