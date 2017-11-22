import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Route, Switch, IndexRoute} from 'react-router-dom';
import HomePage from '../components/homePageComponents/HomePage';
import CataloguePage from '../components/catalogue/CataloguePage';
import DetailsPage from '../components/details/DetailsPage';
import SigninPage from '../components/signin/SigninPage';
import SignupPage from '../components/signup/SignupPage';
import DashboardPage from '../components/dashboard/DashboardPage';
import AddRecipePage from '../components/dashboard/AddRecipePage';
import ViewRecipePage from '../components/dashboard/ViewRecipePage';
import FavouritePage from '../components/dashboard/FavouritePage';
import '../font-awesome/scss/font-awesome.scss';
//import 'font-awesome';
import '../build/css/custom.css';
import '../build/js/script.js';

// class Root extends React.Component {
//   render() {
//     return (
//       <Router>
//          <Route path='/' component={HomePage} />
//       </Router>
//     )
//   }
// }

const Root = () => {
	return (
		<Router>  
		  <div>
		    <Switch>
				<Route exact path='/' component={HomePage} />
				<Route path='/catalogue' component={CataloguePage} />
				<Route path='/details' component={DetailsPage} />
				<Route path='/details' component={DetailsPage} />
				<Route path='/signin' component={SigninPage} />
				<Route path='/signup' component={SignupPage} />
				<Route exact path='/dashboard' component={DashboardPage} />
				<Route exact path='/dashboard/add_recipe' component={AddRecipePage} />
				<Route exact path='/dashboard/view_recipes' component={ViewRecipePage} />
				<Route exact path='/dashboard/favourites' component={FavouritePage} />

				<Route render={() => <p>404, not found. build a whole component for this</p>} />
            </Switch>
		  </div>
		</Router>
	)
}



render(<Root/>, document.querySelector('#mainContainer'));