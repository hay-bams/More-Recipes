import React from 'react';
import HomePageNavigation from './HomePageNavigation';
import Carousel from '../Carousel';

const HomePageHeader = () => (
  <header>
    {/* Navigation */}
    <HomePageNavigation />
    <Carousel />
  </header>
);

export default HomePageHeader;
