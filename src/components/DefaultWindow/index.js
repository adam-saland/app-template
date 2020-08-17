import React from 'react';
import {
  FASTDesignSystemProvider,
  FASTCard,
  FASTButton,
} from '@microsoft/fast-components';
import './index.css';
// import { fastStyles } from './index.css.js';

/*
 * Ensure that tree-shaking doesn't remove these components from the bundle.
 * There are multiple ways to prevent tree shaking, of which this is one.
 */
FASTDesignSystemProvider;
FASTCard;
FASTButton;

export default function DefaultWindow() {
  return (
    <fast-design-system-provider use-defaults>
      <fast-card>
        <h2>FAST React</h2>
        <fast-button appearance="accent" onClick={() => console.log('clicked')}>Click Me</fast-button>
      </fast-card>
    </fast-design-system-provider>
  );
}
