import React from 'react';
import PropTypes from 'prop-types';

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      category: '',
      price: ''
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.info !== this.props.info) {
      this.setState({
        name: this.props.info.name,
        category: this.props.info.category,
        price: this.props.info.default_price
      })
    }
  }

  render() {
    return(
      <div className="info">
        {this.state.category}
        <h4>{this.state.name}</h4>
        <p>{this.state.price}</p>
      </div>
    )
  }
}

Info.propTypes ={
  info: PropTypes.object
}

export default Info;