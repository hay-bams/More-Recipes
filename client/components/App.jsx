import React from 'react';
import HomePageheader from './homePageComponents/HomePageHeader';
import LatestRecipes from './LatestRecipes';
import PopularRecipes from './PopularRecipes';
import Footer from './Footer';

const App = () => (
  <div>
    <HomePageheader />
    <LatestRecipes />
    <PopularRecipes />
    <Footer />
  </div>
);

export default App;
