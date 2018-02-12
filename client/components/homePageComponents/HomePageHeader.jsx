import React from 'react';
import HomePageNavigation from './HomePageNavigation';
import Carousel from '../Carousel';

const HomePageHeader = (props) => (
  <header>
    {/* Navigation */}
    <HomePageNavigation {...props} />
    <Carousel />
  </header>
);

export default HomePageHeader;
