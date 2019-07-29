/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable react/no-typos */
import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/extensions
import {windowBtnStyles} from './windowButton.css.js';

function WindowButton({ name, url, btnText, ...props }) {
  const handleClick = async (name, url) => {
    await fin.Window.create({name, url});
  };
  return (
    <button type="button" style={windowBtnStyles} onClick={() => handleClick(name, url)}>
      {btnText}
    </button>
  );
}

WindowButton.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
};

export default WindowButton