import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/Certification';

const CertificationService = {
    getAllCertification: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}`);
            return response.data;
        } catch (error) {
            console.error('데이터 조회 실패:', error);
            throw error;
        }
    },

    getAllCertificationDetails: async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('자격증 조회 실패:', error);
            throw error;
        }
    },

    createCertification: async (certificationData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/write`, certificationData);
            return response.data;
        } catch (error) {
            console.error('자격증 문제 추가 실패:', error);
            throw error;
        }
    },

    updateCertification: async (id, certificationData) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/${id}`, certificationData);
            return response.data;
        } catch (error) {
            console.error('자격증 문제 수정 실패:', error);
            throw error;
        }
    },

    deleteCertification: async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('자격증 삭제 실패:', error);
            throw error;
        }
    }
};

export default CertificationService;
