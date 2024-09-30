import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MyPage from './MyPage';
import PointSet from './User/Point/PointSet';
import Library from './User/Library/Library'
import AdminSetDepart from './Admin/SetDepart/AdminSetDepart';
import AdminSetQuestion from './Admin/SetQuestion/AdminSetQuestion';

function MypageRoutes({ departments }) {
  return (
    <Routes>
      <Route path="/" element={<MyPage departments={departments} />}>
        <Route path="point-set" element={<PointSet />} />
        <Route path="library" element={<Library />} />
        <Route path="admin-set-depart" element={<AdminSetDepart departments={departments} />} />
        <Route path="admin-set-question" element={<AdminSetQuestion />} />
      </Route>
    </Routes>
  );
}

export default MypageRoutes;