/* eslint-disable */
import rdt from '../devtools.js'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const title = 'React with Webpack and Babel';

const checkEnv = ({ fin }) => {
  if (!fin) {
    return 'NAOE';
  }
  return fin;
};

ReactDOM.render(
  <App title={title} fin={checkEnv(window)} />,
  document.getElementById('app')
);

module.hot.accept();
