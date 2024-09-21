import React from 'react';
import { MDBBtn, MDBBtnGroup } from 'mdb-react-ui-kit';

export default function SearchBar() {
  return (
    <MDBBtnGroup aria-label='Basic example'>
      <MDBBtn>Left</MDBBtn>
      <MDBBtn>Middle</MDBBtn>
      <MDBBtn>Right</MDBBtn>
    </MDBBtnGroup>
  );
}