import React from 'react';
import { Link } from 'react-router-dom';
import Recipes from './Recipes';
import DashboardNav from './DashboardNav';

/**
 * @class AddRecipePage
 */
class AddRecipePage extends React.Component {
    render() {
        return (
            <div>
              <DashboardNav />
              <Recipes />
            </div>
        )
    }
}

export default AddRecipePage;