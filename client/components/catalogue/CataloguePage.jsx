import React from 'react';
import Navigation from '../Navigation';
import ConnectedRecipeCatalogue from '../../containers/RecipesCatalogue';
import Footer from '../Footer';

const Catalogue = props => (
  <div>
    <Navigation {...props}/>
    <ConnectedRecipeCatalogue {...props} />
    <Footer />
  </div>
);

export default Catalogue;
