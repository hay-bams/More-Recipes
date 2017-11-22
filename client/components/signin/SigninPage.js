import React from 'react';
import SiginForm from './SigninForm'; 
import Navigation from '../Navigation';

/**
 * @class SigninPage
 */
class SigninPage extends React.Component {
    render() {
      return (
        <div className='bg-dark'>
          <Navigation />
          <SiginForm />
        </div>
      )
    }
}

export default SigninPage;