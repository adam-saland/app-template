import React from 'react';

export default function TitleBar() {
  return (
    <div id="title-bar">
      <div className="title-bar-draggable">
        <div id="title" />
      </div>
      <div id="buttons-wrapper">
        <div className="button" title="Toggle Theme" id="theme-button" />
        <div className="button" title="Toggle Sidebar" id="menu-button" />
        <div className="button" title="Toggle Layout Lock" id="lock-button" />
        <div className="button" title="Minimize Window" id="minimize-button" />
        <div className="button" title="Maximize Window" id="expand-button" />
        <div className="button" title="Close Window" id="close-button" />
      </div>
    </div>
  );
}
