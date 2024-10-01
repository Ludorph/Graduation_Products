import React from 'react';
import axios from 'axios';

const UserInfo = ({ user, setUser }) => {

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/users/logout', {}, { withCredentials: true });
            setUser(null);
            alert('로그아웃 되었습니다.');
        } catch (error) {
            console.error('로그아웃 오류:', error);
            alert('로그아웃 실패');
        }
    };

    return (
        <div>
            <h2>사용자 정보</h2>
            <p><strong>ID:</strong> {user.user_id}</p>
            <p><strong>이름:</strong> {user.user_name}</p>
            <p><strong>등급:</strong> {user.user_grade}</p>
            <button onClick={handleLogout}>로그아웃</button>
        </div>
    );
};

export default UserInfo;