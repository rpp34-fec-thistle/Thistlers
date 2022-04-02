import React, {Component} from 'react';

class CustomerComments extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="reviews-breakdown-customer-comments">

        <div className="customer-comments-size-label">
          Size
        </div>
        
        <div className="customer-comments-bar-container">
        
          <div className="cc-bar-too-small">
            <div className="too-small-bar cc-bar"></div>
            <div className="too-small-text">Too Small</div>
          </div>

          <div className="cc-bar-perfect">
             <div className="perfect-bar cc-bar"></div>
            <div className="perfect-text">Perfect</div>
          </div>
        
          <div className="cc-bar-too-large">
            <div className="too-large-bar cc-bar"></div>
            <div className="too-large-text">Too Large</div>
          </div>

          <div className="cc-bar-percentage-indicator"></div>
        
        </div>


        {/* COMFORT  */}

        <div className="customer-comments-comfort-label">
          Comfort 
        </div>
        
        <div className="customer-comments-bar-container-2">
        
          <div className="cc-bar-poor">
            <div className="poor cc-bar"></div>
            <div className="poor-text">Poor</div>
          </div>

          <div>
             <div className="cc-bar"></div>
          </div>
        
          <div>
            <div className="cc-bar"></div>
          </div>

          <div className="cc-bar-perfect">
            <div className="perfect cc-bar"></div>
            <div className="perfect-text">Perfect</div>
          </div>

          <div className="cc-bar-percentage-indicator"></div>
        
        </div>

      </div>
    );
  }
}

export default CustomerComments;
