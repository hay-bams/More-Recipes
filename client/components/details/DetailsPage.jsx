import React from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import ProductDetails from '../../containers/ProductDetails';
import ProductReviews from '../../containers/ProductReviews';
import AddReview from '../../containers/AddReview';

const Details = props =>
  (
    <div>
      <Navigation />
      <ProductDetails {...props} />
      <ProductReviews {...props} />
      <AddReview {...props} />
      <Footer />
    </div>
  );


export default Details;
