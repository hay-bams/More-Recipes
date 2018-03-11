import React from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import RecipeDetails from '../../containers/RecipeDetails';
import RecipeReviews from '../../containers/RecipeReviews';
import ConnectedAddReview from '../../containers/AddReview';

const Details = props =>
  (
    <div>
      <Navigation {...props}/>
      <RecipeDetails {...props} />
      <hr />
      <RecipeReviews {...props} />
      <ConnectedAddReview {...props} />
      <Footer />
    </div>
  );


export default Details;
