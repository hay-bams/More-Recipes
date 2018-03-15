import React from 'react';
import UserProfile from './UserProfile';
import DashboardNav from './DashboardNav';

const UserProfilePage = props => (
  <div id="userRecipePage">
    <DashboardNav {...props} />
    <UserProfile />
  </div>
);

export default UserProfilePage;
