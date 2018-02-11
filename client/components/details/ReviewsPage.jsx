import React from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import ReviewDetails from '../../containers/ReviewDetails';
import ProductReviews from '../../containers/ProductReviews';
import AddReview from '../../containers/AddReview';

const Details = props =>
  (
    <div>
      <Navigation />
      <ReviewDetails {...props} />
      <ProductReviews {...props} />
      <AddReview {...props} />
      <Footer />
    </div>
  );


export default Details;
