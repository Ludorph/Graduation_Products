import React, { useState } from 'react';
import { CiSquarePlus, CiUndo } from "react-icons/ci";
import { Dialog, DialogContent, Paper } from '@mui/material';
import Draggable from 'react-draggable';
import WriteQuestion from './WriteQuestion';
import './adminsetquestion.css';
import { styled } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: 0,
  },
  '& .MuiDialog-paper': {
    backgroundColor: '#ffffff',
    margin: 0,
    maxHeight: '100%',
    // 크기 조절 핸들 제거
    '&::-webkit-resizer': {
      display: 'none',
    },
    resize: 'none',
  },
  // 스크롤바 스타일 수정 (선택적)
  '& .MuiDialogContent-root::-webkit-scrollbar': {
    width: '0.4em',
  },
  '& .MuiDialogContent-root::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
  },
  '& .MuiDialogContent-root::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0,0,0,.1)',
    outline: '1px solid slategrey',
  },
}));

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const AdminSetQuestion = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [addedQuestions, setAddedQuestions] = useState([
    {
      title: "2024년 1회 기출문제",
      id: 1,
      certificate: "기계설계산업기사",
      question: "기계설계에 관한 문제입니다...",
      type: "객관식",
      options: ["옵션1", "옵션2", "옵션3"],
      answers: [true, false, false]
    },
    {
      title: "2023년 4회 기출문제",
      id: 2,
      certificate: "생산자동화산업기사",
      question: "생산자동화에 관한 문제입니다...",
      type: "주관식",
      note: "이 문제에 대한 유의사항..."
    }
  ]);

  const handleAddQuestion = () => {
    setEditingQuestion(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingQuestion(null);
  };

  // 이미 추가된 문제 수정기능 관련
  const [editingQuestion, setEditingQuestion] = useState(null);

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setOpenDialog(true);
  };

  // 작성완료 버튼을 누르면 호출되는 함수
  // newQuestion => { title: string, id: number } 형식의 객체
  // setAddedQuestions([...addedQuestions, newQuestion]) => 상태 업데이트 함수로 newQuestion 끝에 넣음
  const handleQuestionAdded = (newQuestion) => {
    if (editingQuestion) {
      // 수정 모드
      setAddedQuestions(addedQuestions.map(q =>
        q.id === editingQuestion.id ? { ...q, ...newQuestion } : q
      ));
    } else {
      // 새 문제 추가 모드
      setAddedQuestions([...addedQuestions, { ...newQuestion, id: Date.now() }]);
    }
    handleCloseDialog();
  };
  return (
    <div className="admin-question-management">
      <div className="admin-question-header">문제 관리</div>
      <div className="admin-set-question-container">
        <div className="admin-set-question-left">
          <span className="admin-item-text">문제 추가</span>
        </div>
        <div className="admin-set-question-right">
          <div className="admin-set-question-box">
            <div className="admin-set-question-top">
              <CiSquarePlus
                className="admin-set-question-icon add-icon"
                size={24}
                onClick={handleAddQuestion}
              />
              <CiUndo className="admin-set-question-icon undo-icon" size={24} />
            </div>
            <div className="admin-set-question-bottom">
              {addedQuestions.map((question) => (
                <div key={question.id} className="added-question-item">
                  <span>[{question.certificate}] {question.title}</span>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="edit-icon"
                    onClick={() => handleEditQuestion(question)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <StyledDialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <div id="draggable-dialog-title" style={{ cursor: 'move', padding: '10px', backgroundColor: '#ecc344' }}>
          {editingQuestion ? '문제 수정' : '문제 추가'}
        </div>
        <DialogContent>
          <WriteQuestion
            onClose={handleCloseDialog}
            onQuestionAdded={handleQuestionAdded}
            editingQuestion={editingQuestion}
          />
        </DialogContent>
      </StyledDialog>
    </div>
  );
};

export default AdminSetQuestion;