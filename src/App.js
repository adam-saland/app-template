import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const App = ({ title, fin }) => {
  /* eslint-disable */
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
      <button
        onClick={() => {
          fin.Window.create({
            name: 'BundleAnalyzer',
            url: `http://${location.host}/report.html`,
            target: fin.Window.me,
          });
        }}
      >
        Analyze WebPack Bundle!
      </button>
      <button
        onClick={() => {
          fin.Window.create({
            name: 'BundleVisualizer',
            url: `http://${location.host}/stats.html`,
            target: fin.Window.me,
          })
        }}
      >
        Visualize WebPack Bundle!
      </button>
    </div>
  );
};
/* eslint-disable */
App.propTypes = {
  title: PropTypes.string.isRequired,
  fin: PropTypes.any,
};

export default App;
