import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jokboService from './jokboService';

const JokboTempDetail = () => {
    const [jokbo, setJokbo] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJokbo = async () => {
            try {
                const data = await jokboService.getJokboById(id);
                setJokbo(data);
            } catch (error) {
                console.error('족보 조회 실패:', error);
            }
        };
        fetchJokbo();
    }, [id]);

    const handleEdit = () => {
        navigate(`/board/jokbo/edit/${id}`);
    };

    const handleDelete = async () => {
        if (window.confirm('정말로 이 족보를 삭제하시겠습니까?')) {
            try {
                const result = await jokboService.deleteJokbo(id);
                if (result.success) {
                    alert('족보가 삭제되었습니다.');
                    navigate('/board/jokbo');
                } else {
                    alert(`족보 삭제 실패: ${result.error}`);
                }
            } catch (error) {
                console.error('족보 삭제 실패:', error);
                alert('족보 삭제에 실패했습니다.');
            }
        }
    };

    if (!jokbo) return <div>Loading...</div>;

    return (
        <div>
            <p>{jokbo.examdata_title}</p>
            <p>작성자: {jokbo.user_id}</p>
            <p>작성일: {new Date(jokbo.examdata_cdate).toLocaleDateString()}</p>
            <div dangerouslySetInnerHTML={{ __html: jokbo.examdata_content }} />

            <div style={{ marginTop: '20px' }}>
                <button onClick={handleEdit} style={{ marginRight: '10px' }}>수정</button>
                <button onClick={handleDelete}>삭제</button>
            </div>
        </div>
    );
};

export default JokboTempDetail;
