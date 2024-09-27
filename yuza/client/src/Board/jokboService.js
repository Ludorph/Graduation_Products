import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/db';

const jokboService = {
    getAllJokbos: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}`);
            return response.data;
        } catch (error) {
            console.error('데이터 조회 실패:', error);
            throw error;
        }
    },

    getJokboById: async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('족보 조회 실패:', error);
            throw error;
        }
    },

    createJokbo: async (jokboData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/write`, jokboData);
            return response.data;
        } catch (error) {
            console.error('족보 추가 실패:', error);
            throw error;
        }
    },

    updateJokbo: async (id, jokboData) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/${id}`, jokboData);
            return response.data;
        } catch (error) {
            console.error('족보 수정 실패:', error);
            throw error;
        }
    },

    deleteJokbo: async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('족보 삭제 실패:', error);
            throw error;
        }
    }
};

export default jokboService;