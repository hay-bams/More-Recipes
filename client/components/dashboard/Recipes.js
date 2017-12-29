import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @class Recipes
 */
class Recipes extends React.Component {
    render() {
        return (
            <div className = "main-userboard-body">
              <div className = "container-fluid">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active">View Recipe</li>
                </ol>
              </div>
      
              <div className = "container">
                <div className = "row">
                  <div className = "col-lg-12">
                    <div className = "row">
                    <div className = "col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 recipes">
                      <div className="card recipe-card" style = {{border: 'none'}}>
                        <img className="card-img-top img-fluid" src="../images/recipe22.jpg" alt="Card image cap" style = {{height: 200 + 'px'}}/> /
                        <div className="card-body">
                          <h4 className="card-title">Card title</h4>
                          <p className="card-text">
                            <span className = "row">
                              <a href="#" className = "text-success"><i className="fa fa-thumbs-up col-4" aria-hidden="true"></i>10</a>
                              <a href="#" className = "text-info"><i className="fa fa-comment col-4" aria-hidden="true"></i>25</a>
                              <a href="#" className = "text-danger"><i className="fa fa-thumbs-down col-4" aria-hidden="true"></i>3</a>
                            </span>
                          </p>
                          <span className = "btn btn-primary"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                          <span className = "btn btn-danger"><i className="fa fa-trash-o" aria-hidden="true"></i></span>
                          <span className = "btn btn-info"><i className="fa fa-eye" aria-hidden="true"></i></span>
                        </div>
                      </div>
                    </div>
        
                    <div className = "col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 recipes">
                      <div className="card recipe-card" style = {{border: 'none'}}>
                        <img className="card-img-top img-fluid" src="../images/recipe2.jpg" alt="Card image cap" style = {{height: 200 + 'px'}} />
                        <div className="card-body">
                          <h4 className="card-title">Card title</h4>
                          <p className="card-text">
                            <span className = "row">
                              <a href="#" className = "text-success"><i className="fa fa-thumbs-up col-4" aria-hidden="true"></i>10</a>
                              <a href="#" className = "text-info"><i className="fa fa-comment col-4" aria-hidden="true"></i>25</a>
                              <a href="#" className = "text-danger"><i className="fa fa-thumbs-down col-4" aria-hidden="true"></i>3</a>
                            </span>
                          </p>
                          <span className = "btn btn-primary"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                          <span className = "btn btn-danger"><i className="fa fa-trash-o" aria-hidden="true"></i></span>
                          <span className = "btn btn-info"><i className="fa fa-eye" aria-hidden="true"></i></span>
                        </div>
                      </div>
                    </div>
        
                    <div className = "col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 recipes">
                      <div className="card recipe-card" style = {{border: 'none'}}>
                        <img className="card-img-top img-fluid" src="../images/recipe3.jpg" alt="Card image cap" style = {{height: 200 + 'px'}}/>
                        <div className="card-body">
                          <h4 className="card-title">Card title</h4>
                          <p className="card-text">
                            <span className = "row">
                              <a href="#" className = "text-success"><i className="fa fa-thumbs-up col-4" aria-hidden="true"></i>10</a>
                              <a href="#" className = "text-info"><i className="fa fa-comment col-4" aria-hidden="true"></i>25</a>
                              <a href="#" className = "text-danger"><i className="fa fa-thumbs-down col-4" aria-hidden="true"></i>3</a>
                            </span>
                          </p>
                          <span className = "btn btn-primary"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                          <span className = "btn btn-danger"><i className="fa fa-trash-o" aria-hidden="true"></i></span>
                          <span className = "btn btn-info"><i className="fa fa-eye" aria-hidden="true"></i></span>
                        </div>
                      </div>
                    </div>
        
                    <div className = "col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 recipes">
                      <div className="card recipe-card" style = {{border: 'none'}}>
                        <img className="card-img-top img-fluid" src="../images/recipe4.jpg" alt="Card image cap" style = {{height: 200 + 'px'}}/>
                        <div className="card-body">
                          <h4 className="card-title">Card title</h4>
                          <p className="card-text">
                            <span className = "row">
                              <a href="#" className = "text-success"><i className="fa fa-thumbs-up col-4" aria-hidden="true"></i>10</a>
                              <a href="#" className = "text-info"><i className="fa fa-comment col-4" aria-hidden="true"></i>25</a>
                              <a href="#" className = "text-danger"><i className="fa fa-thumbs-down col-4" aria-hidden="true"></i>3</a>
                            </span>
                          </p>
                          <span className = "btn btn-primary"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                          <span className = "btn btn-danger"><i className="fa fa-trash-o" aria-hidden="true"></i></span>
                          <span className = "btn btn-info"><i className="fa fa-eye" aria-hidden="true"></i></span>
                        </div>
                      </div>
                    </div>
        
                    <div className = "col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 recipes">
                      <div className="card recipe-card" style = {{border: 'none'}}>
                        <img className="card-img-top img-fluid" src="../images/recipe22.jpg" alt="Card image cap" style = {{height: 200 + 'px'}}/>
                        <div className="card-body">
                          <h4 className="card-title">Card title</h4>
                          <p className="card-text">
                            <span className = "row">
                              <a href="#" className = "text-success"><i className="fa fa-thumbs-up col-4" aria-hidden="true"></i>10</a>
                              <a href="#" className = "text-info"><i className="fa fa-comment col-4" aria-hidden="true"></i>25</a>
                              <a href="#" className = "text-danger"><i className="fa fa-thumbs-down col-4" aria-hidden="true"></i>3</a>
                            </span>
                          </p>
                          <span className = "btn btn-primary"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                          <span className = "btn btn-danger"><i className="fa fa-trash-o" aria-hidden="true"></i></span>
                          <span className = "btn btn-info"><i className="fa fa-eye" aria-hidden="true"></i></span>
                        </div>
                      </div>
                    </div>
        
                    <div className = "col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 recipes">
                      <div className="card recipe-card" style = {{border: 'none'}}>
                        <img className="card-img-top img-fluid" src="../images/recipe6.jpg" alt="Card image cap" style = {{height: 200 + 'px'}}/>
                        <div className="card-body">
                          <h4 className="card-title">Card title</h4>
                          <p className="card-text">
                            <span className = "row">
                              <a href="#" className = "text-success"><i className="fa fa-thumbs-up col-4" aria-hidden="true"></i>10</a>
                              <a href="#" className = "text-info"><i className="fa fa-comment col-4" aria-hidden="true"></i>25</a>
                              <a href="#" className = "text-danger"><i className="fa fa-thumbs-down col-4" aria-hidden="true"></i>3</a>
                            </span>
                          </p>
                          <span className = "btn btn-primary"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                          <span className = "btn btn-danger"><i className="fa fa-trash-o" aria-hidden="true"></i></span>
                          <span className = "btn btn-info"><i className="fa fa-eye" aria-hidden="true"></i></span>
                        </div>
                      </div>
                    </div>
        
                    <div className = "col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 recipes">
                      <div className="card recipe-card" style = {{border: 'none'}}>
                        <img className="card-img-top img-fluid" src="../images/recipe7.jpg" alt="Card image cap" style = {{height: 200 + 'px'}}/>
                        <div className="card-body">
                          <h4 className="card-title">Card title</h4>
                          <p className="card-text">
                            <span className = "row">
                              <a href="#" className = "text-success"><i className="fa fa-thumbs-up col-4" aria-hidden="true"></i>10</a>
                              <a href="#" className = "text-info"><i className="fa fa-comment col-4" aria-hidden="true"></i>25</a>
                              <a href="#" className = "text-danger"><i className="fa fa-thumbs-down col-4" aria-hidden="true"></i>3</a>
                            </span>
                          </p>
                          <span className = "btn btn-primary"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                          <span className = "btn btn-danger"><i className="fa fa-trash-o" aria-hidden="true"></i></span>
                          <span className = "btn btn-info"><i className="fa fa-eye" aria-hidden="true"></i></span>
                        </div>
                      </div>
                    </div>
        
                    <div className = "col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 recipes">
                      <div className="card recipe-card" style = {{border: 'none'}}>
                        <img className="card-img-top img-fluid" src="../images/recipe8.gif" alt="Card image cap" style = {{height: 200 + 'px'}}/>
                        <div className="card-body">
                          <h4 className="card-title">Card title</h4>
                          <p className="card-text">
                            <span className = "row">
                              <a href="#" className = "text-success"><i className="fa fa-thumbs-up col-4" aria-hidden="true"></i>10</a>
                              <a href="#" className = "text-info"><i className="fa fa-comment col-4" aria-hidden="true"></i>25</a>
                              <a href="#" className = "text-danger"><i className="fa fa-thumbs-down col-4" aria-hidden="true"></i>3</a>
                            </span>
                          </p>
                          <span className = "btn btn-primary"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                          <span className = "btn btn-danger"><i className="fa fa-trash-o" aria-hidden="true"></i></span>
                          <span className = "btn btn-info"><i className="fa fa-eye" aria-hidden="true"></i></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
            </div>
          </div>
      
        )
    }
}

export default Recipes;