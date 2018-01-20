import React from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import ProductDetails from './ProductDetails';
import ProductReviews from './ProductReviews';
import AddReview from './AddReview';

const Details = () =>
  (
    <div>
      <Navigation />
      <ProductDetails />
      <ProductReviews />
      <AddReview />
      <Footer />
    </div>
  );


export default Details;
