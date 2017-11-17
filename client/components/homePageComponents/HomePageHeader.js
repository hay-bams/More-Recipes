import React from 'react';
import Navigation from './Navigation';
import Carousel from '../Carousel'; 

class HomePageHeader extends React.Component {
    render() {
        return (
            <header>
              {/*Navigation*/}
              <Navigation />
              <Carousel />
            </header>
        )
    }
}

export default HomePageHeader;
