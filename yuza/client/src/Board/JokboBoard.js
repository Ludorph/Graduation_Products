import React from 'react';
import { Routes, Route } from 'react-router-dom';
import JokboList from './JokboList';
import JokboWrite from './JokboWrite';
import JokboDetail from './JokboDetail';
import JokboTempDetail from "./JokboTempDetail";

function JokboBoard() {
  return (
    <Routes>
      <Route path="/" element={<JokboList />} />
      <Route path="/write" element={<JokboWrite />} />
      {/*<Route path="/:id" element={<JokboDetail />} />  /!* 족보 글 페이지 *!/*/}
      <Route path="/:id" element={<JokboTempDetail />} />
    </Routes>
  );
}

export default JokboBoard;