import React from 'react';
import SignupForm from '../../containers/SignupForm';
import Navigation from '../Navigation';

class SignupPage extends React.Component {
	// componentDidMount() {
  //   this.props.userSigned ? this.redirectUser() : ''
  // }

	render() {
			return(
					<div className='bg-dark'>
						<Navigation />
						<SignupForm {...this.props} redirectUser = {this.props.history}/>
					</div>
			)
	}
}

export default SignupPage; 