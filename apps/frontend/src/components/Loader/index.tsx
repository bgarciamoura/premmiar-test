import React from 'react';
import './styles.css';

// create a loader component that will be used in all pages
const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__spinner" />
    </div>
  );
};

export { Loader };
