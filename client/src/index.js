import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import HomePage from '../components/homePageComponents/HomePage';
import CataloguePage from '../components/catalogue/CataloguePage';
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
		    <switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/catalogue' component={CataloguePage} />
          <Route render={() => <p>404, not found. build a whole component for this</p>} />
        </switch>
		  </div>
		</Router>
	)
}



render(<Root/>, document.querySelector('#mainContainer'));