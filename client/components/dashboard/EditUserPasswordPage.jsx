import React from 'react';
import EditUserPasswordForm from '../../containers/EditUserPasswordForm';
import DashboardNav from './DashboardNav';

const EditUserProfilePage = props => (
  <div>
    <DashboardNav {...props} />
    <EditUserPasswordForm {...props} />
  </div>
);

export default EditUserProfilePage;
