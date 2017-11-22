import React from 'react';
import SignupForm from './SignupForm';
import Navigation from '../Navigation';

class SignupPage extends React.Component {
    render() {
        return(
            <div className='bg-dark'>
             <Navigation />
             <SignupForm />
            </div>
        )
    }
}

export default SignupPage; 