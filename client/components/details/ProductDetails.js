import React from 'react';

class ProductDetails extends React.Component {
    render() {
        return (
            <div className = "container">
              <div className = "row">
                <div className = "col-sm-12">
                  <h2 className = "details">Food Name Goes Here</h2>
                </div>
      
                <div className = "col-sm-6 recipe-img">
                    <img className="recipe-details img-fluid" src="images/recipe2.jpg" alt="Details image" />
                    <div className = "row">           
                      <a href="#" class = "text-success"><i class="fa fa-thumbs-up col-4" aria-hidden="true"></i>10</a>
                      <a href="#" class = "text-info"><i class="fa fa-comment col-4" aria-hidden="true"></i>25</a>
                      <a href="#" class = "text-danger"><i class="fa fa-thumbs-down col-4" aria-hidden="true"></i>3</a>
                      <a href="#" class = "btn btn-success">upvote <i class="fa fa-thumbs-up" aria-hidden="true"></i></a>
                      <a href="#" class = "btn btn-danger">downvote <i class="fa fa-thumbs-down" aria-hidden="true"></i></a>
                    </div>         
                </div>
      
                <div className = "col-sm-6">
                  <h3 className = "text-center">Ingredients</h3>
                  <p>salt, sugar, lorem,ipsum,dolor, exercitations, maggi, red oil, tomatoe</p>
                  <h3 className = "text-center preparation">Preparations</h3>
                  <p>(1). Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br />
                  (2). Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  <br />
                  (3). Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
              </div>
            </div>
    
        )
    }
}

export default ProductDetails;