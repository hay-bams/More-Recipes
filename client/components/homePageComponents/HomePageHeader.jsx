import React from 'react';
import Navigation from '../Navigation';
import Carousel from '../Carousel';

const HomePageHeader = props => (
  <header>
    {/* Navigation */}
    <Navigation {...props} />
    <Carousel />
  </header>
);

export default HomePageHeader;
