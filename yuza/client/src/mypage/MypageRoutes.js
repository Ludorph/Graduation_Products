import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MyPage from './MyPage';
import PointSet from './User/Point/PointSet';
import Library from './User/Library/Library'
import AdminSetQuestion from './Admin/AdminSetQuestion';

function MypageRoutes() {
  return (
    <Routes>
        {/* 마이페이지 컴포넌트 내부요소에 이중 컴포넌틀를 사용하면서 url을 변경하기 위한 중첩 라우팅 */}
      <Route path="/" element={<MyPage />}>
        <Route path="point-set" element={<PointSet />} /> 
        <Route path="library" element={<Library />} /> 
        <Route path="admin-setquestion" element={<AdminSetQuestion />} /> 
      </Route>
    </Routes>
  );
}

export default MypageRoutes;