/* eslint-disable no-restricted-globals */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable react/no-typos */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import WindowButton from './components/WindowButton';

function App({ title, fin }) {
  const [version, setVersion] = useState('');
  useEffect(() => {
    (async () => {
      const v = await fin.System.getVersion();
      setVersion(v);
    })();
  }, []);
  // eslint-disable-next-line prettier/prettier
  return (
    <div className="main">
      <h1>{title}</h1>
      <h3>
        Version:
        {version}
      </h3>
      <WindowButton
        uuid={fin.Window.me.uuid}
        name="Analyze"
        url={`http://${location.host}/report.html`}
        btnText="Analyze WebPack Bundle!"
      />
      <WindowButton
        uuid={fin.Window.me.uuid}
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
