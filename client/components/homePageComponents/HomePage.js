import React from 'react';
import HomePageheader from './HomePageHeader';
import LatestRecipes from '../LatestRecipes';
import PopularRecipes from '../PopularRecipes';
import Footer from '../Footer';

/**
 * @class HomePage
 */

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <HomePageheader />
        <LatestRecipes />
        <PopularRecipes />
        <Footer />
      </div>
    )
  }
}


export default HomePage;