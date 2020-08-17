/* eslint-disable */
// import rdt from '../devtools.js'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LayoutContainer from './components/LayoutContainer';

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

ReactDOM.render(<LayoutContainer />, document.getElementById('layout-container'))

module.hot.accept();
