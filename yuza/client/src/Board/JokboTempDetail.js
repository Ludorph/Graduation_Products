import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const JokboTempDetail = () => {
    const [jokbo, setJokbo] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchJokbo = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/db/${id}`);
                setJokbo(response.data);
            } catch (error) {
                console.error('족보 조회 실패:', error);
            }
        };

        fetchJokbo();
    }, [id]);

    return (
        <div>
            <p>제목: {jokbo.examdata_title}</p>
            <p>작성자: {jokbo.user_id}</p>
            <p>작성일: {new Date(jokbo.examdata_cdate).toLocaleDateString()}</p>
            <div dangerouslySetInnerHTML={{ __html: jokbo.examdata_content }} />
        </div>
    );
};

export default JokboTempDetail;