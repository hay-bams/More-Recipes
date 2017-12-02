import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @class UserProfile
 */
class UserProfile extends React.Component {
    render() {
        return (
          <div className = "main-userboard-body">
            <div className = "container-fluid">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Add Recipe</li>
              </ol>
            </div>
    
            <div className = "container">
              <div className = "row">
                <div className = "col-sm-6 col-md-6 col-lg-4 col-xl-4">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Profile Picture</h4>
                      <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p> <img src="images/24475008.jpg" className = "img-fluid rounded-circle" /></p>
                      
                    <form>
                      <input type="file" name="" />
                    </form>
                    </div>
                  </div>
                </div>
      
                <div className = "col-sm-6 col-md-6 col-lg-4 col-xl-4">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Basic Pofile</h4>
                      <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                      <p className="card-text">
                        <strong>First Name:</strong> <span>Ayobami</span>
                      </p>
      
                      <p className="card-text">
                      <strong>Last Name:</strong> <span>Adelakun</span>
                      </p>
      
                      <p className="card-text">
                        <strong>Username:</strong> <span>Purpose50</span>
                      </p>
      
                      <p className="card-text">
                      <strong>Email:</strong> <span>purpose4nigeria@gmail.com</span>
                      </p>
      
                      <p className="card-text">
                      <strong>password:</strong> <span>topwealth</span>
                      </p>
                      <a href="#" className="card-link">Edit</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        )
    }
}

export default UserProfile;