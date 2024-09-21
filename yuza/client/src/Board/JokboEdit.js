import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jokboService from './jokboService';

const JokboEdit = () => {
    const [jokbo, setJokbo] = useState({ examdata_title: '', examdata_content: '' });
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJokbo(prevJokbo => ({ ...prevJokbo, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await jokboService.updateJokbo(id, jokbo);
            if (result.success) {
                alert('족보가 성공적으로 수정되었습니다.');
                navigate(`/board/jokbo/${id}`);
            } else {
                alert(`족보 수정 실패: ${result.error}`);
            }
        } catch (error) {
            console.error('족보 수정 실패:', error);
            alert('족보 수정에 실패했습니다.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="examdata_title"
                value={jokbo.examdata_title}
                onChange={handleChange}
                placeholder="제목"
                required
            />
            <textarea
                name="examdata_content"
                value={jokbo.examdata_content}
                onChange={handleChange}
                placeholder="내용"
                required
            />
            <button type="submit">수정 완료</button>
        </form>
    );
};

export default JokboEdit;