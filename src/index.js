/* eslint-disable */
// import rdt from '../devtools.js'
import React from 'react';
import ReactDOM from 'react-dom';
import './public/frame-styles.css';
import './public/frame-styles-template.css';
import './public/light-theme.css';
import App from './App';


const title = 'React with Webpack and Babel';

const checkEnv = ({ fin }) => {
  if (!fin) {
    return 'NAOE';
  }
  return fin;
};



ReactDOM.render(
  <App />,
  document.getElementById('app')
);

// ReactDOM.render(<DefaultWindow />, document.getElementById('default-window'))

// ReactDOM.render(<LayoutContainer />, document.getElementById('layout-container'))
module.hot.accept();
