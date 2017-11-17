import React from 'react';
import HomePageheader from './homePageComponents/HomePageHeader';
import LatestRecipes from './LatestRecipes';
import PopularRecipes from './PopularRecipes';
import Footer from './Footer';


/**
 * @class App
 */
class App extends React.Component {    
    render() {
        return (
          <div>
            <HomePageheader />
            <LatestRecipes />
            <PopularRecipes />
            <Footer />
          </div>
        )
    }    
}

export default App;