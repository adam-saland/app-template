/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
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
import {btn} from './index.css.js';

function WindowButton({ name, url, btnText, ...props }) {
  const handleClick = async (name, url) => {
    const currentWin = await fin.Window.create({name, url, autoShow: true, frame: false});
    console.log("Window:", currentWin.identity)
  };
  return (
    <button type="button" style={btn} onClick={() => handleClick(name, url)} {...props}>
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