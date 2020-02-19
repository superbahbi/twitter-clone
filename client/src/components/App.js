import React, { useState, useEffect } from 'react';
import '../styles/App.css';

function App() {
  const [state, setState] = useState({});
  useEffect(() => {
    // This gets called after every render, by default
    // (the first one, and every one after that)
    const request = async () => {
      const response = await fetch('http://localhost:3001/api/');
      setState(await response.json());
     
    }
    request();
    // If you want to implement componentWillUnmount,
    // return a function from here, and React will call
    // it prior to unmounting.
    return () => console.log('unmounting...');
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src="" className="App-logo" alt="logo" />
        <p > 
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
