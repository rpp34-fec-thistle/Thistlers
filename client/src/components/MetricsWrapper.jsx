import React from 'react';
import axios from 'axios';

function MetricWrapper(Comp, props) {
  return  class x extends React.Component {
    constructor(props) {
      super(props);
      this.state = {}
      this.interaction = this.interaction.bind(this);
    }
    interaction(element, widget, time) {
      axios.post('/interactions', {element, widget, time})
        .then(() => {
          console.log('interact success')
        })
        .catch((err) => {
          console.log('interactions Error:', err)
        })
    }
    render() {
      return <Comp {...props} interaction={this.interaction}/>
    }
  }

}

export default MetricWrapper;