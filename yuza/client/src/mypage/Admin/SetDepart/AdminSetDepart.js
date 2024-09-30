import React, { useState, useEffect } from 'react';
import { CgCheck } from "react-icons/cg";
import { IoSchoolSharp } from "react-icons/io5";
import { Autocomplete, TextField, Modal, Button } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import './adminsetdepart.css';

/* 전공추가 모달창 관련 styled */
const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 20px;
  width: 400px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 60px;
  align-items: center;
`;

const InputWrapper = styled.div`
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  height: 65px;
`;

const ButtonWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled(Button)`
  && {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0;
    font-family: 'NanumSquareNeoBold', sans-serif;
    font-size: 16px;
  }
`;

const CancelButton = styled(StyledButton)`
  && {
    background-color: white;
    color: #7b7b7b;
    border-top: 1px solid #d0d0d0;
    font-weight: bold;
    &:hover {
      background-color: #e0e0e0;
    }
    &:focus {
      outline: none;
    }
    &.MuiButton-outlined {
      border-top: 1px solid #d0d0d0;
      border-right: 0.5px solid #d0d0d0;
      border-bottom: 1px solid #d0d0d0;
      border-left: 1px solid #d0d0d0;
    }
  }
`;

const SubmitButton = styled(StyledButton)`
  && {
    background-color: white;
    color: #5f7daf;
    border-top: 1px solid #d0d0d0;
    font-weight: bold;
    &:hover {
      background-color: #e0e0e0;
    }
    &.MuiButton-outlined {
      border-top: 1px solid #d0d0d0;
      border-right: 1px solid #d0d0d0;
      border-bottom: 1px solid #d0d0d0;
      border-left: 0.5px solid #d0d0d0;
    }
  }
`;

const InputField = styled(TextField)`
  width: 300px;
  .MuiInputBase-root {
    background-color: #f5f5f5;
    width: 100%;
  }
  .MuiInputBase-input {
    color: #2d2d2d;
  }
  .MuiOutlinedInput-notchedOutline {
    border-color: #d0d0d0;
  }
`;

const ModalStyledAutocomplete = styled(Autocomplete)`
  width: 100%;
  .MuiInputBase-root {
    background-color: #f5f5f5;
    width: 100%;
  }
  .MuiInputBase-input {
    color: #2d2d2d;
  }
  .MuiOutlinedInput-notchedOutline {
    border-color: #d0d0d0;
  }
`;

const PlaceholderIcon = styled(IoSchoolSharp)`
  color: #c8c8c8;
  margin-right: 8px;
  margin-left: 8px;
`;

const AdminSetDepart = ({ departments = [], onSaveDepartments }) => {
  const [localDepartments, setLocalDepartments] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [newFaculty, setNewFaculty] = useState('');
  const [newDepartment, setNewDepartment] = useState('');
  const [newlyAddedIds, setNewlyAddedIds] = useState([]); // 새로 추가된 ID들을 저장
  // const { departments } = useOutletContext();

  // 새 전공을 추가하는 함수부분 
  useEffect(() => {
    setLocalDepartments(departments);
  }, [departments]);

  const handleAddDepartment = () => {
    if (newFaculty && newDepartment) {
      const newId = getMaxId() + 1;
      const newMajor = {
        id: newId,
        name: newDepartment,
        checked: false,
        registrationDate: new Date().toISOString().split('T')[0]
      };

      setLocalDepartments(prevDepartments => {
        const facultyIndex = prevDepartments.findIndex(dept => dept.name === newFaculty);
        if (facultyIndex !== -1) {
          // 기존 학부에 전공 추가
          const updatedDepartments = [...prevDepartments];
          updatedDepartments[facultyIndex] = {
            ...updatedDepartments[facultyIndex],
            majors: [...updatedDepartments[facultyIndex].majors, newMajor]
          };
          return updatedDepartments;
        } else {
          // 새 학부 생성 및 전공 추가
          return [...prevDepartments, {
            name: newFaculty,
            majors: [newMajor]
          }];
        }
      });

      setNewlyAddedIds(prev => [...prev, newId]);
      handleCloseModal();
    }
  };

  const getMaxId = () => {
    return localDepartments.reduce((maxId, dept) => {
      const deptMaxId = dept.majors.reduce((id, major) => Math.max(id, major.id), 0);
      return Math.max(maxId, deptMaxId);
    }, 0);
  };

  // 여기까지


  // 이건 저장로직 
  const handleSave = () => {
    // 여기서 저장 로직을 구현. 예를 들어, API 호출 등
    // 저장이 성공적으로 완료되면 newlyAddedIds를 초기화합니다.
    setNewlyAddedIds([]);
    if (onSaveDepartments) {
      onSaveDepartments(localDepartments);
    }
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setLocalDepartments(localDepartments.map(dept => ({
      ...dept,
      majors: dept.majors.map(major => ({ ...major, checked: newSelectAll }))
    })));
  };

  const handleSelect = (id) => {
    setLocalDepartments(localDepartments.map(dept => ({
      ...dept,
      majors: dept.majors.map(major =>
        major.id === id ? { ...major, checked: !major.checked } : major
      )
    })));
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setNewFaculty('');
    setNewDepartment('');
  };

  useEffect(() => {
    console.log('Departments in AdminSetDepart:', departments);
    if (departments && departments.length > 0) {
      setLocalDepartments(departments);
    }
  }, [departments]);

  const faculties = [...new Set(departments?.map(dept => dept.name) || [])];

  if (!departments || departments.length === 0) {
    return <div>학과 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div className="admin-depart-management">
      <div className="admin-depart-header">과별 자격증 메뉴 관리</div>
      <div className="admin-set-depart-container">
        <div className="admin-set-depart-wrapper">
          <div className="admin-set-depart-title">전공 추가&삭제</div>
          <div className="admin-set-depart-section">
            <div className="admin-set-depart-content">
              <table className="admin-depart-table">
                <colgroup>
                  <col style={{ width: "7%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "25%" }} />
                  <col style={{ width: "40%" }} />
                  <col style={{ width: "18%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>
                      <div className="custom-checkbox" onClick={handleSelectAll}>
                        {selectAll && <CgCheck className="check-icon" size={24} />}
                      </div>
                    </th>
                    <th>ID</th>
                    <th>학부명</th>
                    <th>학과명</th>
                    <th>등록일</th>
                  </tr>
                </thead>
              </table>
              <div className="table-body-container">
                <table className="admin-depart-table">
                  <colgroup>
                    <col style={{ width: "7%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "25%" }} />
                    <col style={{ width: "40%" }} />
                    <col style={{ width: "18%" }} />
                  </colgroup>
                  <tbody>
                    {localDepartments.flatMap((dept) =>
                      (dept.majors || []).map((major) => (
                        <tr key={major.id} className={newlyAddedIds.includes(major.id) ? 'newly-added' : ''}>
                          <td>
                            <div
                              className={`custom-checkbox ${major.checked ? 'checked' : ''}`}
                              onClick={() => handleSelect(major.id)}
                            >
                              {major.checked && <CgCheck className="check-icon" size={24} />}
                            </div>
                          </td>
                          <td>{major.id}</td>
                          <td>{dept.name}</td>
                          <td>{major.name}</td>
                          <td>{major.registrationDate || '정보 없음'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="admin-depart-actions-top"></div>
      <div className="admin-depart-actions">
        <div className="admin-depart-actions-left">
          <button onClick={handleOpenModal} className="admin-depart-button">전공추가</button>
          <button className="admin-depart-button">삭제하기</button>
        </div>
        <div className="admin-depart-actions-right">
          <button onClick={handleSave} className="admin-depart-button save-button">
            저장하기
          </button>
        </div>
      </div>

      <StyledModal
        open={modalOpen}
        onClose={handleCloseModal}
      >
        <ModalContent>
          <InputContainer>
            <InputWrapper>
              <ModalStyledAutocomplete
                options={faculties}
                renderInput={(params) => (
                  <InputField
                    {...params}
                    placeholder="학부명을 선택/입력"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <>
                          <PlaceholderIcon />
                          {params.InputProps.startAdornment}
                        </>
                      ),
                    }}
                  />
                )}
                value={newFaculty}
                onChange={(event, newValue) => setNewFaculty(newValue)}
                freeSolo
              />
            </InputWrapper>
            <InputWrapper>
              <InputField
                placeholder="전공명 입력"
                value={newDepartment}
                onChange={(e) => setNewDepartment(e.target.value)}
                variant="outlined"
              />
            </InputWrapper>
          </InputContainer>
          <ButtonContainer>
            <ButtonWrapper>
              <CancelButton onClick={handleCloseModal} variant="outlined">취소</CancelButton>
            </ButtonWrapper>
            <ButtonWrapper>
              <SubmitButton onClick={handleAddDepartment} variant="contained">리스트에 추가</SubmitButton>
            </ButtonWrapper>
          </ButtonContainer>
        </ModalContent>
      </StyledModal>
    </div>
  );
};

export default AdminSetDepart;