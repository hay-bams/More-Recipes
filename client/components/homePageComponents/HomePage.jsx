import React from 'react';
import HomePageheader from './HomePageHeader';
import LatestRecipes from '../../containers/LatestRecipes';
import PopularRecipes from '../PopularRecipes';
import Footer from '../Footer';


const HomePage = () => (
  <div>
    <HomePageheader />
    <LatestRecipes />
    <PopularRecipes />
    <Footer />
  </div>
);


export default HomePage;
