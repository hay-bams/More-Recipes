import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import allReducers from '../reducers/allReducers';
import HomePage from '../components/homePageComponents/HomePage';
import CataloguePage from '../components/catalogue/CataloguePage';
import DetailsPage from '../components/details/DetailsPage';
import SigninPage from '../components/signin/SigninPage';
import SignupPage from '../components/signup/SignupPage';
import signoutPage from '../components/SignoutPage';
import DashboardPage from '../components/dashboard/DashboardPage';
import AddRecipePage from '../components/dashboard/AddRecipePage';
import EditRecipePage from '../components/dashboard/EditRecipePage';
import EditUserProfilePage from '../components/dashboard/EditUserProfilePage';
import EditUserPasswordPage from '../components/dashboard/EditUserPasswordPage';
import ViewRecipePage from '../components/dashboard/ViewRecipePage';
import FavouritePage from '../components/dashboard/FavouritePage';
import UserProfilePage from '../components/dashboard/UserProfilePage';
import NotFound from '../components/NotFound';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../css/custom.css';
import '../js/script';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const getUserData = JSON.parse(localStorage.getItem('userData')) || {};

let userData = {};
if (getUserData.user !== undefined && getUserData.token !== undefined) {
  userData = {
    user: getUserData.user,
    token: getUserData.token
  };
}

const createStoreWithMiddleware = createStore(
  allReducers, { userData },
  composeEnhancers(applyMiddleware(ReduxPromise))
);


const Root = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/catalogue" component={CataloguePage} />
        <Route path="/details/:id" component={DetailsPage} />
        <Route path="/signin" component={SigninPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/signoutPage" component={signoutPage} />
        <Route exact path="/dashboard" component={DashboardPage} />
        <Route exact path="/add_recipe" component={AddRecipePage} />
        <Route exact path="/view_recipes" component={ViewRecipePage} />
        <Route exact path="/edit_recipes/:id" component={EditRecipePage} />
        <Route exact path="/edit_user/:id" component={EditUserProfilePage} />
        <Route exact path="/edit_password/:id" component={EditUserPasswordPage} />
        <Route exact path="/favourites" component={FavouritePage} />
        <Route exact path="/user_profile" component={UserProfilePage} />

        <Route render={NotFound} />
      </Switch>
    </div>
  </Router>
);

render(<Provider store={createStoreWithMiddleware}><Root /></Provider>,
  document.querySelector('#mainContainer'));
