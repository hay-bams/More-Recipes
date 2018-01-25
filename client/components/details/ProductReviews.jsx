import React from 'react';

const ProductReviews = () => (
  <div className="container">
    <div className="row">
      <div className="col-sm-8 reviews">
        <h3>Reviews</h3>
        <div className="media">
          <img
            className="mr-3"
            src="images/24475008.jpg"
            style={{ width: `${80}px` }}
            alt="Generic placeholder"
          />
          <div className="media-body">
            <h5 className="mt-0">Media heading</h5>
            Cras sit amet nibh libero, in gravida nulla.
             Nulla vel metus scelerisque ante sollicitudin.
              Cras purus odio, vestibulum in vulputate at,
               tempus viverra turpis. Fusce condimentum nunc ac
                nisi vulputate fringilla. Donec lacinia congue
                 felis in faucibus.
          </div>
        </div>

        <div className="media">
          <img
            className="mr-3"
            src="images/24475008.jpg"
            style={{ width: `${80}px` }}
            alt="Generic placeholder"
          />
          <div className="media-body">
            <h5 className="mt-0">Media heading</h5>
            Cras sit amet nibh libero, in gravida nulla.
             Nulla vel metus scelerisque ante sollicitudin. Cras purus
              odio, vestibulum in vulputate at, tempus viverra turpis.
               Fusce condimentum nunc ac nisi vulputate fringilla.
                Donec lacinia congue felis in faucibus.
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProductReviews;
