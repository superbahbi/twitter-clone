//  if required auth, pass token in header
// endpoint /getData/:id
// method GET, POST, PUT, DELETE
import React, { useState, useEffect } from 'react';

const useFetch = (token, endpoint, method, body) => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiData, setApiData] = useState([]);
    const [serverError, setServerError] = useState(null);
    const url = process.env.REACT_APP_API_URL;
    useEffect(() => {
        setIsLoading(true);
        const fetchData = () => {
            fetch(`${url}${endpoint}`, {
                method: method ? method : 'GET',
                headers: {
                    Accept: "application/x-www-form-urlencoded",
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: "Bearer " + token,
                },
                data: body ? body : null
            })
                .then(results => results.json())
                .then(data => {
                    setApiData(data);
                    setIsLoading(false);
                })
                .catch(error => {
                    setServerError(error);
                })
                .finally(() => {
                    setIsLoading(false);
                })
        };
        fetchData();
    }, [token, endpoint, method, body]);

    return { isLoading, apiData, serverError };
};
export default useFetch;