import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setUser }) => {
    const [form, setForm] = useState({
        user_id: '',
        user_password: ''
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
            const response = await axios.post('http://localhost:5000/users/login', form, { withCredentials: true });
            setMessage(response.data.message);
            setUser(response.data.user);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage('로그인 실패');
            }
        }
    };

    return (
        <div>
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>아이디:</label>
                    <input type="text" name="user_id" value={form.user_id} onChange={handleChange} required />
                </div>
                <div>
                    <label>비밀번호:</label>
                    <input type="password" name="user_password" value={form.user_password} onChange={handleChange} required />
                </div>
                <button type="submit">로그인</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;