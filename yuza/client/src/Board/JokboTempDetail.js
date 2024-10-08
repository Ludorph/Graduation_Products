import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jokboFetch } from '../fetch/JokboFetch';

const JokboTempDetail = () => {
    const { id } = useParams();
    const jokbo = jokboFetch.useFetchJokboById(id);
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/board/jokbo/edit/${id}`);
    };

    const handleDelete = async () => {
        if (window.confirm('정말로 이 족보를 삭제하시겠습니까?')) {
            try {
                const result = await jokboFetch.deleteJokbo(id);
                if (result) {
                    alert('족보가 삭제되었습니다.');
                    navigate('/board/jokbo');
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
            <p>작성일: {new Date(jokbo.examdata_date).toLocaleDateString()}</p>
            <div dangerouslySetInnerHTML={{ __html: jokbo.examdata_content }} />

            <div style={{ marginTop: '20px' }}>
                <button onClick={handleEdit} style={{ marginRight: '10px' }}>수정</button>
                <button onClick={handleDelete}>삭제</button>
            </div>
        </div>
    );
};

export default JokboTempDetail;
