import React from 'react';

import './styles/styleInput.css';
import Send from './images/send.svg';

const Input = () => (
  <div className="input-container my-4">
    <input placeholder="Search Movies" type="text" />
    <img src={Send} alt="Send Icon" />
  </div>
);

export default Input;
