import React from 'react';
import SiginForm from '../../containers/SigninForm'; 
import Navigation from '../Navigation';

/**
 * @class SigninPage
 */
class SigninPage extends React.Component {
    render() {
      return (
        <div className='bg-dark'>
          <Navigation />
          <SiginForm  redirectUser = {this.props.history}/>
        </div>
      )
    }
}

export default SigninPage;