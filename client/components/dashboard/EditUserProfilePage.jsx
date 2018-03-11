import React from 'react';
import ConnectedEditUserProfileForm from '../../containers/EditUserProfileForm';
import DashboardNav from './DashboardNav';

const EditUserProfilePage = props => (
  <div>
    <DashboardNav {...props} />
    <ConnectedEditUserProfileForm {...props} />
  </div>
);

export default EditUserProfilePage;
