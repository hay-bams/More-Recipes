import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from '../components/homePageComponents/HomePage';
import CataloguePage from '../components/catalogue/CataloguePage';
import DetailsPage from '../components/details/DetailsPage';
import SigninPage from '../components/Signin/SigninPage';
import SignupPage from '../components/Signup/SignupPage';
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
          <Route render={() => <p>404, not found. build a whole component for this</p>} />
        </Switch>
		  </div>
		</Router>
	)
}



render(<Root/>, document.querySelector('#mainContainer'));