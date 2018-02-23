import React from 'react';
import Navigation from '../Navigation';
import RecipesCatalogue from '../../containers/RecipesCatalogue';
import Footer from '../Footer';

const Catalogue = props => (
  <div>
    <Navigation {...props}/>
    <RecipesCatalogue {...props} />
    <Footer />
  </div>
);

export default Catalogue;
