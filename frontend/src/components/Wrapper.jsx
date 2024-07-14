import React from 'react';
import '../stylesheets/Wrapper.css';

const Wrapper = ({ children }) => {
  return <div className="wrapper">{children}</div>;
};

export default Wrapper;