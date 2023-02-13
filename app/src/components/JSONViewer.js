import React from 'react';

const JSONViewer = ({ data }) => {
  return (
    <pre style={{ whiteSpace: 'pre-wrap', fontSize: '14px' }}>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
};

export default JSONViewer;