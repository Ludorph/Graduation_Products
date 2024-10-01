import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [form, setForm] = useState({
        user_id: '',
        user_password: '',
        user_name: '',
        user_grade: '일반 유저'
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/users/register', form, { withCredentials: true });
            setMessage(response.data.message);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage('회원가입 실패');
            }
        }
    };

    return (
        <div>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>아이디:</label>
                    <input type="text" name="user_id" value={form.user_id} onChange={handleChange} required />
                </div>
                <div>
                    <label>비밀번호:</label>
                    <input type="password" name="user_password" value={form.user_password} onChange={handleChange} required />
                </div>
                <div>
                    <label>이름:</label>
                    <input type="text" name="user_name" value={form.user_name} onChange={handleChange} required />
                </div>
                <div>
                    <label>유저 등급:</label>
                    <select name="user_grade" value={form.user_grade} onChange={handleChange}>
                        <option value="일반 유저">일반 유저</option>
                        <option value="관리자">관리자</option>
                    </select>
                </div>
                <button type="submit">회원가입</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;