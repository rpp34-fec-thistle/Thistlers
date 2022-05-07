import React, {Component} from 'react';
import PropTypes from 'prop-types';

class FullScreenImageModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.modalOn) {
      return (
        <div className="fs-image-modal">
          <div onClick={this.props.toggle} className="close-fs-image-modal">X</div>
          <img src={this.props.url} alt="" width="1000px" height="800px"/>
        </div>
      );
    }
    return <div></div>
  }
}

FullScreenImageModal.propTypes = {
  url: PropTypes.string || PropTypes.object,
  modalOn: PropTypes.bool,
  toggle: PropTypes.func
};

export default FullScreenImageModal;