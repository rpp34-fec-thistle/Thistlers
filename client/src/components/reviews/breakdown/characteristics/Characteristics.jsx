import React from 'react';
import PropTypes from 'prop-types';
import Triangle from './Triangle.jsx';

let Characteristic = props => {
  return (
    <div className="characteristic-container">
      <div className="characteristic-title">{props.title || ''}</div>
      <div className="characteristic-body">
        <Triangle id={props.id} average={props.value || 0}/>
        <div className="characteristic-body-comp"></div>
        <div className="characteristic-body-comp"></div>
        <div className="characteristic-body-comp"></div>
      </div>
      <div className="characteristic-text-container">
        <div className="characteristic-begin-text">{props.text[0] || ''}</div>
        <div className="characteristic-middle-text">{props.text[1] || ''}</div>
        <div className="characteristic-end-text">{props.text[2] || ''}</div>
      </div>
    </div>
  )
};

Characteristic.propTypes = {
  text: PropTypes.array,
  title: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.number
};

export default Characteristic;