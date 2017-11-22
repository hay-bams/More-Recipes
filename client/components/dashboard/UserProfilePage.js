import React from 'react';
import { Link } from 'react-router-dom';
import UserProfile from './UserProfile';
import DashboardNav from './DashboardNav';

/**
 * @class UserProfilePage
 */
class UserProfilePage extends React.Component {
    render() {
        return (
            <div>
              <DashboardNav />
              <UserProfile />
            </div>
        )
    }
}

export default UserProfilePage;