import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/jokbo';

const getAllJokbos = async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
};

const getJokboById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

const createJokbo = async (jokboData) => {
    const response = await axios.post(`${API_URL}/write`, jokboData);
    return response.data;
};

const updateJokbo = async (id, jokboData) => {
    const response = await axios.put(`${API_URL}/${id}`, jokboData);
    return response.data;
};

const deleteJokbo = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

const useFetchAllJokbos = () => {
    const [jokbos, setJokbos] = useState([]);

    useEffect(() => {
        const fetchJokbos = async () => {
            const data = await getAllJokbos();
            setJokbos(data);
        };

        fetchJokbos();
    }, []);

    return jokbos;
};

const useFetchJokboById = (id) => {
    const [jokbo, setJokbo] = useState(null);

    useEffect(() => {
        const fetchJokbo = async () => {
            const data = await getJokboById(id);
            setJokbo(data);
        };

        if (id) fetchJokbo();
    }, [id]);

    return jokbo;
};

export const jokboFetch = {
    getAllJokbos,
    getJokboById,
    createJokbo,
    updateJokbo,
    deleteJokbo,
    useFetchAllJokbos,
    useFetchJokboById
};
