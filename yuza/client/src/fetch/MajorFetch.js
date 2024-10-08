import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/major';

const getAllMajor = async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
};

const getMajorById = async (id) => {
    const response = await axios.get(`${API_URL}/${encodeURIComponent(id)}`);
    return response.data;
};

const useFetchDepartments = () => {
    const [departments, setDepartments] = useState({});

    useEffect(() => {
        const fetchDepartments = async () => {
            const data = await getAllMajor();
            setDepartments(data);
        };

        fetchDepartments();
    }, []);

    return departments;
};

const useFetchMajorById = (id) => {
    const [major, setMajor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMajor = async () => {
            try {
                const data = await getMajorById(id);
                setMajor(data);
            } finally {
                setLoading(false);
            }
        };
        fetchMajor();
    }, [id]);

    return major;
};

export const majorFetch = {
    getAllMajor,
    getMajorById,
    useFetchDepartments,
    useFetchMajorById
};