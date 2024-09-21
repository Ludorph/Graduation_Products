import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataComponent() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/db')
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return { data };
}

export default DataComponent;