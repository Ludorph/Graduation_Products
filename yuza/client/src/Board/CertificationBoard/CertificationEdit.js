import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CertificationService from './CertificationService';

const CertificationEdit = () => {
    const [certification, setCertification] = useState({
        question_title: '',
        question_description: '',
        question_answer: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCertification = async () => {
            setIsLoading(true);
            try {
                const data = await CertificationService.getCertificationById(id);
                setCertification(data);
            } catch (error) {
                console.error('자격증 문제 조회 실패:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCertification();
    }, [id]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCertification(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await CertificationService.updateCertification(id, certification);
            alert('자격증 문제가 성공적으로 수정되었습니다.');
            navigate(`/board/cert/${id}`);
        } catch (error) {
            console.error('자격증 문제 수정 실패:', error);
            alert('자격증 문제 수정에 실패했습니다.');
        }
    };
    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="question_title"
                value={certification.question_title}
                onChange={handleChange}
                placeholder="제목"
            />
            <textarea
                name="question_description"
                value={certification.question_description}
                onChange={handleChange}
                placeholder="문제 설명"
            />
            <input
                type="text"
                name="question_answer"
                value={certification.question_answer}
                onChange={handleChange}
                placeholder="정답"
            />
            <button type="submit">수정</button>
        </form>
    );
};

export default CertificationEdit;