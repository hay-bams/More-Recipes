import React from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import ProductDetails from './ProductDetails';
import ProductReviews from './ProductReviews';
import AddReview from './AddReview';


class Details extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <ProductDetails />
        <ProductReviews />
        <AddReview />
        <Footer />
      </div>
    )
  }
}

export default Details;
