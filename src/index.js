/* eslint-disable */
// import rdt from '../devtools.js'
import React from 'react';
import ReactDOM from 'react-dom';
import "./public/frame-styles.css"
import "./public/frame-styles-template.css"
import "./public/light-theme.css"
// import App from './App';
import LayoutContainer from './components/LayoutContainer';
// import DefaultWindow from './components/DefaultWindow';

const title = 'React with Webpack and Babel';

const checkEnv = ({ fin }) => {
  if (!fin) {
    return 'NAOE';
  }
  return fin;
};

export const CONTAINER_ID = 'layout-container';
window.addEventListener('DOMContentLoaded', () => {
    // Before .50 AI version this may throw...
    fin.Platform.Layout.init({containerId: 'app'});
});

/* ReactDOM.render(
  <App title={title} fin={checkEnv(window)} />,
  document.getElementById('app')
); */

// ReactDOM.render(<DefaultWindow />, document.getElementById('default-window'))

ReactDOM.render(<LayoutContainer />, document.getElementById('layout-container'))
module.hot.accept();
