import React from 'react';
import Navigation from '../Navigation';
import RecipesCatalogue from '../../containers/RecipesCatalogue';
import PopularRecipes from '../PopularRecipes';
import Footer from '../Footer';

const Catalogue = props => (
  <div>
    <Navigation />
    <RecipesCatalogue {...props} />
    <PopularRecipes />
    <Footer />
  </div>
);

export default Catalogue;
