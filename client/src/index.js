import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Route, Switch, IndexRoute} from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import allReducers from '../store/reducers';
import initialState from '../initial.json';
import { signUp, getAllRecipes, addRecipe } from '../actions/actions.js';
import HomePage from '../components/homePageComponents/HomePage';
import CataloguePage from '../components/catalogue/CataloguePage';
import DetailsPage from '../components/details/DetailsPage';
import SigninPage from '../components/signin/SigninPage';
import SignupPage from '../components/signup/SignupPage';
import DashboardPage from '../components/dashboard/DashboardPage';
import AddRecipePage from '../components/dashboard/AddRecipePage';
import ViewRecipePage from '../components/dashboard/ViewRecipePage';
import FavouritePage from '../components/dashboard/FavouritePage';
import UserProfilePage from '../components/dashboard/UserProfilePage';
import '../font-awesome/scss/font-awesome.scss';
import '../build/css/custom.css';
import '../build/js/script.js';

 const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore)(allReducers);
//const createStoreWithMiddleware = createStore(allReducers);

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
				<Route exact path='/dashboard/user_profile' component={UserProfilePage} />

				<Route render={() => <p>404, not found. build a whole component for this</p>} />
            </Switch>
		  </div>
		</Router>
	)
}

render(<Provider store={createStoreWithMiddleware}><Root/></Provider>, document.querySelector('#mainContainer'));
