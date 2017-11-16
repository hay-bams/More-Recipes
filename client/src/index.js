import React from 'react';
import { render } from 'react-dom';
import App from '../components/App';

/**
 * @class Root
 */
class Root extends React.Component {  
  render() {
    return (
      <div>
       <App />
      </div>
    )
  }
}

render(<Root />, document.querySelector('#mainContainer'));