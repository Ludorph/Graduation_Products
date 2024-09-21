import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FreeList from './FreeList';
import FreeWrite from './FreeWrite';
import FreeDetail from './FreeDetail';

function FreeBoard() {
  return (
    <Routes>
      <Route path="/" element={<FreeList />} />
      <Route path="/write" element={<FreeWrite />} />
      <Route path="/:id" element={<FreeDetail />} />  {/* 족보 글 페이지 */}
    </Routes>
  );
}

export default FreeBoard;