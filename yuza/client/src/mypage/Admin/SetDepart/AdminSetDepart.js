import React, { useState } from 'react';
import { CgCheck } from "react-icons/cg";
import { IoSchoolSharp } from "react-icons/io5";
import { Autocomplete, TextField, Modal, Button } from '@mui/material';
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

/* 모달 내에서 일정한 여백을 유지 */
const InputWrapper = styled.div`
  width: 100%;
`;

/* 모달창 버튼 스타일 */
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



const AdminSetDepart = () => {
    const [departments, setDepartments] = useState([
        { id: 1, faculty: '공학부', department: '컴퓨터소프트웨어전공', registrationDate: '2024-09-29', checked: false },
        { id: 2, faculty: '공학부', department: '인공지능전공', registrationDate: '2024-09-29', checked: false },
        { id: 16, faculty: '디자인문화학부', department: '방송연예전공', registrationDate: '2024-09-29', checked: false },
    ]);

    const [selectAll, setSelectAll] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [newFaculty, setNewFaculty] = useState('');
    const [newDepartment, setNewDepartment] = useState('');

    const faculties = ['공학부', '경영대학', '인문대학', '자연과학대학', '디자인문화학부']; // 더미 데이터

    const handleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        setDepartments(departments.map(dept => ({ ...dept, checked: newSelectAll })));
    };

    const handleSelect = (id) => {
        setDepartments(departments.map(dept =>
            dept.id === id ? { ...dept, checked: !dept.checked } : dept
        ));
    };

    const handleDelete = () => {
        setDepartments(departments.filter(dept => !dept.checked));
        setSelectAll(false);
    };

    const handleSave = () => {
        console.log('Saving departments:', departments);
        // 여기에 저장 로직 추가
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setNewFaculty('');
        setNewDepartment('');
    };

    const handleAddDepartment = () => {
        if (newFaculty && newDepartment) {
            const newId = Math.max(...departments.map(dept => dept.id)) + 1;
            const newDept = {
                id: newId,
                faculty: newFaculty,
                department: newDepartment,
                registrationDate: new Date().toISOString().split('T')[0],
                checked: false
            };
            setDepartments([...departments, newDept]);
            handleCloseModal();
        }
    };

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
                                <tbody>
                                    {departments.map((dept) => (
                                        <tr key={dept.id}>
                                            <td>
                                                <div className={`custom-checkbox ${dept.checked ? 'checked' : ''}`} onClick={() => handleSelect(dept.id)}>
                                                    {dept.checked && <CgCheck className="check-icon" size={24} />}
                                                </div>
                                            </td>
                                            <td>{dept.id}</td>
                                            <td>{dept.faculty}</td>
                                            <td>{dept.department}</td>
                                            <td>{dept.registrationDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="admin-depart-actions">
                                <div className="admin-depart-actions-left">
                                    <button onClick={handleOpenModal} className="admin-depart-button">전공추가</button>
                                    <button onClick={handleDelete} className="admin-depart-button">삭제하기</button>
                                </div>
                                <div className="admin-depart-actions-right">
                                    <button onClick={handleSave} className="admin-depart-button save-button">저장하기</button>
                                </div>
                            </div>
                        </div>
                    </div>
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