import React from 'react';
import PropTypes from 'prop-types';
import Triangle from './Triangle.jsx';

let Characteristic = props => {
  let text = ["", "", ""];
  let value = "";
  let title = "";
  if (props.text) text = props.text;
  if (props.title) title = props.title;
  if (props.value) value = props.value;

  return (
    <div className="characteristic-container">
      <div className="characteristic-title">{title}</div>
      <div className="characteristic-body">
        <Triangle id={props.id} average={value}/>
        <div className="characteristic-body-comp"></div>
        <div className="characteristic-body-comp"></div>
        <div className="characteristic-body-comp"></div>
      </div>
      <div className="characteristic-text-container">
        <div className="characteristic-begin-text">{text[0]}</div>
        <div className="characteristic-middle-text">{text[1]}</div>
        <div className="characteristic-end-text">{text[2]}</div>
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