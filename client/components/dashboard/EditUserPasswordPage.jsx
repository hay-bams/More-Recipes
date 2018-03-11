import React from 'react';
import ConnectedEditUserPasswordForm from
  '../../containers/EditUserPasswordForm';
import DashboardNav from './DashboardNav';

const EditUserProfilePage = props => (
  <div>
    <DashboardNav {...props} />
    <ConnectedEditUserPasswordForm {...props} />
  </div>
);

export default EditUserProfilePage;
