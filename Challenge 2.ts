import React from 'react';
import PropTypes from 'prop-types';


const FirstApp = ({ title, subTitle }) => {
  return (
    <>
      <h1>{title}</h1>
      <span>{subTitle}</span>
    </>
  );
};


FirstApp.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.number.isRequired,
};


FirstApp.defaultProps = {
  title: 'No hay título',
  subTitle: 0,
};


const App = () => {
  return (
    <React.StrictMode>
      {}
      <FirstApp title="Mi Primera App" subTitle={10} />
    </React.StrictMode>
  );
};

export default App;