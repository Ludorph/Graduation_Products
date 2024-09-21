import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CertificationList from './CertificationList';
import CertificationWrite from './CertificationWrite';
import CertificationDetail from './CertificationDetail';

function CertificationBoard() {
  return (
    <Routes>
      <Route path="/" element={<CertificationList />} />
      <Route path="/write" element={<CertificationWrite />} />
      <Route path="/:id" element={<CertificationDetail />} />  
    </Routes>
  );
}

export default CertificationBoard;