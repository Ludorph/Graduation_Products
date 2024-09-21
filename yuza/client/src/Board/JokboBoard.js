import React from 'react';
import { Routes, Route } from 'react-router-dom';
import JokboList from './JokboList';
import JokboWrite from './JokboWrite';
import JokboDetail from './JokboDetail';
import JokboTempDetail from "./JokboTempDetail";
import JokboEdit from './JokboEdit';

function JokboBoard() {
  return (
    <Routes>
      <Route path="/" element={<JokboList />} />
      <Route path="/write" element={<JokboWrite />} />
      {/*<Route path="/:id" element={<JokboDetail />} />  /!* 족보 글 페이지 *!/*/}
      <Route path="/:id" element={<JokboTempDetail />} />
      <Route path="/edit/:id" element={<JokboEdit />} />
    </Routes>
  );
}

export default JokboBoard;