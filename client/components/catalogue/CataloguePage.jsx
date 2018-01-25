import React from 'react';
import Navigation from '../Navigation';
import RecipesCatalogue from '../../containers/RecipesCatalogue';
import PopularRecipes from '../PopularRecipes';
import Footer from '../Footer';


const Catalogue = () => (
  <div>
    <Navigation />
    <RecipesCatalogue />
    <PopularRecipes />
    <Footer />
  </div>
);

export default Catalogue;
