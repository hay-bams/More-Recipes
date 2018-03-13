import React from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import ConnectedRecipeDetails from '../../containers/RecipeDetails';
import ConnectedRecipeReviews from '../../containers/RecipeReviews';
import ConnectedAddReview from '../../containers/AddReview';

const Details = props =>
  (
    <div>
      <Navigation {...props}/>
      <ConnectedRecipeDetails {...props} />
      <hr />
      <ConnectedRecipeReviews {...props} />
      <ConnectedAddReview {...props} />
      <Footer />
    </div>
  );


export default Details;
