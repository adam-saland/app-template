/* eslint-disable max-len */
import React from 'react';
import {
  FASTDesignSystemProvider,
  FASTCard,
  FASTButton,
} from '@microsoft/fast-components';
import './index.css';

/*
 * Ensure that tree-shaking doesn't remove these components from the bundle.
 * There are multiple ways to prevent tree shaking, of which this is one.
 */
FASTDesignSystemProvider;
FASTCard;
FASTButton;

const maxOrRestore = async () => {
  if (await fin.me.getState() === 'normal') {
    const maxState = await fin.me.maximize();
    return maxState;
  }

  return fin.me.restore();
};

const titleBar = () => (

  <div id="title-bar" className="title-bar-draggable">
    <div id="title" />
  </div>
);
export default function DefaultWindow() {
  return (
    <>
      {/* {titleBar()} */}
      <div className="left-menu">
        <fast-design-system-provider use-defaults>
          <fast-card>
            <h2>FAST React</h2>
            <fast-button appearance="accent" onClick={() => console.log('clicked')}>Click Me</fast-button>
          </fast-card>
        </fast-design-system-provider>
      </div>
    </>
  );
}
