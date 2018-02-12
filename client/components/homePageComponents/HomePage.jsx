import React from 'react';
import HomePageheader from './HomePageHeader';
import LatestRecipes from '../../containers/LatestRecipes';
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
    <Footer />
  </div>
);


export default HomePage;
