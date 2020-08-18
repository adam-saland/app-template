import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './public/frame-styles.css';
import './public/frame-styles-template.css';
import './public/light-theme.css';
import DefaultWindow from './components/DefaultWindow';

function App() {
  const CONTAINER_ID = 'layout-container';
  useEffect(() => {
    window.fin && window.addEventListener('DOMContentLoaded', () => {
      // Before .50 AI version this may throw...
      fin.Platform.Layout.init({ containerId: CONTAINER_ID });
    });
  }, []);
  return (
    <DefaultWindow />
  );
}

export default App;
