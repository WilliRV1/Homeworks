import React, { useState } from 'react';
import PropTypes from 'prop-types';


const CounterApp = ({ value }) => {

  const [counter, setCounter] = useState(value);


  const handleAdd = () => setCounter(counter + 1);
  const handleSubstract = () => setCounter(counter - 1);
  const handleReset = () => setCounter(value); 

  return (
    <>
      <h1>CounterApp</h1>
      <span>{counter}</span>

      {}
      <button onClick={handleAdd}>+1</button>
      <button onClick={handleSubstract}>-1</button>
      <button onClick={handleReset}>Reset</button>
    </>
  );
};


CounterApp.propTypes = {
  value: PropTypes.number.isRequired,
};


CounterApp.defaultProps = {
  value: 0,
};


const App = () => {
  return (
    <React.StrictMode>
      {}
      <CounterApp value={10} />
    </React.StrictMode>
  );
};

export default App;