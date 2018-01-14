import React from 'react';
import { Link } from 'react-router-dom';
// import Recipes from './Recipes';
import DashboardNav from './DashboardNav';
import UserRecipes from '../../containers/UserRecipes';

/**
 * @class AddRecipePage
 */
class AddRecipePage extends React.Component {
    render() {
        return (
            <div>
              <DashboardNav />
              <UserRecipes />
            </div>
        )
    }
}

export default AddRecipePage;