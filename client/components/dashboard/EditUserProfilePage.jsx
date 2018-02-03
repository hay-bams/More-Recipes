import React from 'react';
import EditUserProfileForm from '../../containers/EditUserProfileForm';
import DashboardNav from './DashboardNav';

const EditUserProfilePage = props => (
  <div>
    <DashboardNav />
    <EditUserProfileForm {...props} />
  </div>
);

export default EditUserProfilePage;