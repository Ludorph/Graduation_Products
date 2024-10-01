import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MyPage from './MyPage';
import PointSet from './User/Point/PointSet';
import Library from './User/Library/Library'
import AdminSetDepart from './Admin/SetDepart/AdminSetDepart';
import AdminSetQuestion from './Admin/SetQuestion/AdminSetQuestion';
// import Depart from '../department/Depart'; // Depart 컴포넌트 import

function MypageRoutes() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const storedDepartments = localStorage.getItem('departments');
    if (storedDepartments) {
      setDepartments(JSON.parse(storedDepartments));
    } else {
      // 만약 localStorage에 데이터가 없다면, 기본 데이터를 설정합니다.
      const defaultDepartments = [
        {
          name: '공학부',
          majors: [
            { id: 1, name: '기계시스템전공', checked: false, registrationDate: '2023-01-01' },
            { id: 2, name: '소방설비안전전공', checked: false, registrationDate: '2023-01-01' },
            // ... 다른 전공들 ...
          ]
        },
        // ... 다른 학부들 ...
      ];
      setDepartments(defaultDepartments);
      localStorage.setItem('departments', JSON.stringify(defaultDepartments));
    }
  }, []);


<<<<<<< HEAD
  return (
    <Routes>
      <Route path="/" element={<MyPage />}>
        <Route path="point-set" element={<PointSet />} />
        <Route path="library" element={<Library />} />
        <Route path="admin-set-depart" element={<AdminSetDepart departments={departments} setDepartments={setDepartments} />} />
        <Route path="admin-set-question" element={<AdminSetQuestion />} />
=======
function MypageRoutes() {
  return (
    <Routes>
        {/* 마이페이지 컴포넌트 내부요소에 이중 컴포넌틀를 사용하면서 url을 변경하기 위한 중첩 라우팅 */}
      <Route path="/" element={<MyPage />}>
        <Route path="point-set" element={<PointSet />} /> 
        <Route path="library" element={<Library />} /> 
        <Route path="admin-set-depart" element={<AdminSetDepart />} /> 
        <Route path="admin-set-question" element={<AdminSetQuestion />} /> 
>>>>>>> 57ba392c4fc2a7279814103b4162250cb667af70
      </Route>
    </Routes>
  );
}

export default MypageRoutes;