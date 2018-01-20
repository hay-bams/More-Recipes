import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch, IndexRoute } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import allReducers from '../store/reducers';
import initialState from '../initial.json';``
import { signUp, getAllRecipes, addRecipe } from '../actions/actions';
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
import '../css/custom.css';
import '../js/script';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = createStore(
	 allReducers, {},
	 composeEnhancers(applyMiddleware(ReduxPromise))
);

const Root = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/catalogue" component={CataloguePage} />
        <Route path="/details" component={DetailsPage} />
        <Route path="/details" component={DetailsPage} />
        <Route path="/signin" component={SigninPage} />
        <Route path="/signup" component={SignupPage} />
        <Route exact path="/dashboard" component={DashboardPage} />
        <Route exact path="/add_recipe" component={AddRecipePage} />
        <Route exact path="/view_recipes" component={ViewRecipePage} />
        <Route exact path="/favourites" component={FavouritePage} />
        <Route exact path="/user_profile" component={UserProfilePage} />

        <Route render={() => <p>404, not found. build a whole component for this</p>} />
      </Switch>
    </div>
  </Router>
);

render(<Provider store={createStoreWithMiddleware}><Root /></Provider>, document.querySelector('#mainContainer'));
