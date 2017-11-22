import React from 'react';
import { Link } from 'react-router-dom';
import FavouriteRecipes from './Favourite';
import DashboardNav from './DashboardNav';

/**
 * @class AddRecipePage
 */
class AddRecipePage extends React.Component {
    render() {
        return (
            <div>
              <DashboardNav />
              <FavouriteRecipes />
            </div>
        )
    }
}

export default AddRecipePage;