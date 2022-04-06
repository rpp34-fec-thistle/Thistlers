import React from 'react';

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return(
      <div className="info">
        INFO [Placeholder]
        CATEGORY
        <h4>PRODUCT NAME</h4>
        <p>PRICE</p>
      </div>
    )
  }
}

export default Info;