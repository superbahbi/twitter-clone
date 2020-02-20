import React, {useState, useEffect} from 'react';

function Home() {
    const [ state, setState ] = useState({});
    useEffect(() => {
        // This gets called after every render, by default (the first one, and every one
        // after that)
        const request = async(id = 100) => {
            const response = await fetch(`http://localhost:3001/api/home`)
            const json = await response.json();
            setState(json);
        }
        request();
        // If you want to implement componentWillUnmount, return a function from here,
        // and React will call it prior to unmounting.
        return () => console.log('unmounting...');
    }, []);
    const {foundUser, foundTweet } = state;
    console.log(foundTweet);
    return <h1>{foundTweet.map((item) => (
        console.log(item)
    ))}</h1>
}
export default Home;
