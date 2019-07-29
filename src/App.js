/* eslint-disable no-restricted-globals */
/* eslint-disable react/forbid-prop-types */
/* eslint-disablereact/prop-types */
/* eslint-disableno-shadow */
/* eslint-disableno-undef */
/* eslint-disable react/no-typos */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import WindowButton from './components/WindowButton';

function App({ title, fin }) {
  const [version, setVersion] = useState('');
  useEffect(() => {
    fin.System.getVersion().then(v => setVersion(v));
  }, []);
  return (
    <div className="main">
      <h1>{title}</h1>
      <h3>
        Version:
        {version}
      </h3>
      <WindowButton
        name="Analyze"
        url={`http://${location.host}/report.html`}
        btnText="Analyze WebPack Bundle!"
      />
      <WindowButton
        name="Visualize"
        url={`http://${location.host}/stats.html`}
        btnText="Visualize WebPack Bundle!"
      />
    </div>
  );
}

App.propTypes = {
  title: PropTypes.string.isRequired,
  fin: PropTypes.object.isRequired,
};

export default App;
