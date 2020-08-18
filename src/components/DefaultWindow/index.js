/* eslint-disable max-len */
import React from 'react';
import TitleBar from '../TitleBar';
import Menu from '../Menu';
import LayoutContainer from '../LayoutContainer';
import './frame-styles.css';
import './frame-styles-template.css';
import './light-theme.css';

export default function DefaultWindow() {
  return (
    <div id="of-frame-main">
      <TitleBar />
      <div id="body-container">
        <Menu />
        <LayoutContainer />
      </div>
    </div>
  );
}
