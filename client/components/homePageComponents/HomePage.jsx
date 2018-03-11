import React from 'react';
import HomePageheader from './HomePageHeader';
import ConnectedLatestRecipes from '../../containers/LatestRecipes';
import ConnectedPopularRecipes from '../../containers/PopularRecipes';
import Footer from '../Footer';

const HomePage = props => (
  <div>
    <HomePageheader {...props}/>
    <ConnectedLatestRecipes />
    <ConnectedPopularRecipes />
    <Footer />
  </div>
);


export default HomePage;
