import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function App({ title, fin }) {
  const [version, setVersion] = useState('');
  useEffect(() => {
    (async () => {
      const v = await fin.System.getVersion();
      setVersion(v);
    })();
  }, []);
  return (
    <div className="main">
      <h1>{title}</h1>
      <h3>
        Version:
        {version}
      </h3>
    </div>
  );
}

App.propTypes = {
  title: PropTypes.string.isRequired,
  fin: PropTypes.object.isRequired,
};

export default App;
