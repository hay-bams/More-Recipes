import React from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import RecipeDetails from '../../containers/RecipeDetails';
import RecipeReviews from '../../containers/RecipeReviews';
import AddReview from '../../containers/AddReview';

const Details = props =>
  (
    <div>
      <Navigation />
      <RecipeDetails {...props} />
      <hr />
      <RecipeReviews {...props} />
      <AddReview {...props} />
      <Footer />
    </div>
  );


export default Details;
