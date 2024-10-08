import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CertificationList from './CertificationList';
import CertificationWrite from './CertificationWrite';
import CertificationDetail from './CertificationDetail';
import CertificationTempDetail from "./CertificationTempDetail";
import CertificationEdit from './CertificationEdit';

function CertificationBoard() {
  return (
    <Routes>
      <Route path="/" element={<CertificationList />} />
      <Route path="/write" element={<CertificationWrite />} />
      <Route path="/test/:id" element={<CertificationDetail />} />
      <Route path="/:id" element={<CertificationTempDetail />} />
      <Route path="/edit/:id" element={<CertificationEdit />} />
    </Routes>
  );
}

export default CertificationBoard;