import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CertificationService from './CertificationService';

const CertificationTempDetail = () => {
    const [certification, setCertification] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCertification = async () => {
            try {
                const data = await CertificationService.getCertificationById(id);
                setCertification(data);
            } catch (error) {
                console.error('자격증 문제 조회 실패:', error);
            }
        };
        fetchCertification();
    }, [id]);

    const handleEdit = () => {
        navigate(`/board/Certification/edit/${id}`);
    };

    const handleDelete = async () => {
        if (window.confirm('정말로 이 자격증 문제를 삭제하시겠습니까?')) {
            try {
                const result = await CertificationService.deleteCertification(id);
                if (result.success) {
                    alert('자격증 문제가 삭제되었습니다.');
                    navigate('/board/certification');
                } else {
                    alert(`자격증 문제 삭제 실패: ${result.error}`);
                }
            } catch (error) {
                console.error('자격증 문제 삭제 실패:', error);
                alert('자격증 문제 삭제에 실패했습니다.');
            }
        }
    };

    if (!certification) return <div>로딩 중...</div>;

    return (
        <div>
            <h2>{certification.question_title}</h2>
            <br></br><br></br>
            <h4>
                <div dangerouslySetInnerHTML={{__html: certification.question_description}}/>
            </h4>
            <br></br><br></br>
            <p>정답: {certification.question_answer}</p>
            <button onClick={handleEdit}>수정</button>
            <button onClick={handleDelete}>삭제</button>
        </div>
    );
};

export default CertificationTempDetail;
