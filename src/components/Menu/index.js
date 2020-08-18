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
export default function Menu() {
  return (
    <div className="left-menu">
      <fast-design-system-provider use-defaults>
        <fast-card>
          <h2>FAST React</h2>
          <fast-button appearance="accent" onClick={() => console.log('clicked')}>Click Me</fast-button>
        </fast-card>
      </fast-design-system-provider>
    </div>
  );
}
