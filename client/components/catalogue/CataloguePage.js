import React from 'react';
import Navigation from '../Navigation';
import RecipesCatalogue from './RecipesCatalogue';
import PopularRecipes from '../PopularRecipes';
import Footer from '../Footer';

class Catalogue extends React.Component {
  render() {
    return (
     <div>
        <Navigation />
        <RecipesCatalogue />
        <PopularRecipes />
        <Footer />
     </div>
    )
  }
}

export default Catalogue;