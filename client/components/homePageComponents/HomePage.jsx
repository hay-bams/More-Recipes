import React from 'react';
import HomePageheader from './HomePageHeader';
import LatestRecipes from '../../containers/LatestRecipes';
import PopularRecipes from '../../containers/PopularRecipes';
import Footer from '../Footer';

const HomePage = props => (
  <div>
    <HomePageheader {...props}/>
    <LatestRecipes />
    <PopularRecipes />
    <Footer />
  </div>
);


export default HomePage;
