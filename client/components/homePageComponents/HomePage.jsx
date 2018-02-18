import React from 'react';
import HomePageheader from './HomePageHeader';
import LatestRecipes from '../../containers/LatestRecipes';
import PopularRecipes from '../../containers/PopularRecipes';
import Footer from '../Footer';


// const isSignedIn = (props) => {
//   if (localStorage.userData === undefined) {
//     props.history.push('/');
//   }
//   // const userToken = userData.token;
// };

const HomePage = props => (
  <div>
    {/* {isSignedIn(props)} */}
    <HomePageheader />
    <LatestRecipes />
    <PopularRecipes />
    <Footer />
  </div>
);


export default HomePage;
