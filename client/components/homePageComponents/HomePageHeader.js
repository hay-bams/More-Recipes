import React from 'react';
import HomePageNavigation from './HomePageNavigation';
import Carousel from '../Carousel'; 

class HomePageHeader extends React.Component {
    render() {
        return (
            <header>
              {/*Navigation*/}
              <HomePageNavigation />
              <Carousel />
            </header>
        )
    }
}

export default HomePageHeader;
