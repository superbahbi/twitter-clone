import React, {useState, useEffect} from 'react';

import Login from './Login';
function App() {
    const [state,
        setState] = useState({});
    useEffect(() => {
        // This gets called after every render, by default (the first one, and every one
        // after that)
        const request = async(id = 100) => {
            const response = await fetch(`http://localhost:3001/api`)
            const json = await response.json();
            setState(json);
        }
        request();
        // If you want to implement componentWillUnmount, return a function from here,
        // and React will call it prior to unmounting.
        return () => console.log('unmounting...');
    }, []);

    return (
        <div>
            <Login />
        </div>
    );
}

export default App;
