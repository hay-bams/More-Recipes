import React from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import ProductDetails from '../../containers/ProductDetails';
import ProductReviews from './ProductReviews';
 import AddReview from '../../containers/AddReview';
//import AddReview from './AddReview';
const Details = props =>
  (
    <div>
      <Navigation />
      <ProductDetails {...props} />
      <ProductReviews />
      <AddReview {...props} />
      <Footer />
    </div>
  );


export default Details;
