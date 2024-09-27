import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  ThemeProvider,
  Autocomplete,
  createTheme,
  Button,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import styled, { keyframes, css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCheck, faRotateRight, faUpload, faTrash, faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import './certificationwritestyle.css';

// 자격증 선택 select-box 관련(흔들리는 애니메이션)
const shakeAnimation = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

// error prop가 true면 흔들리는 애니메이션과 빨간색 테두리를 적용
const StyledAutocomplete = styled(Autocomplete)`
  width: 100%;  // 부모 요소의 전체 너비를 사용
  ${props => props.$error && css`
    animation: ${shakeAnimation} 0.5s ease-in-out;
    .MuiOutlinedInput-notchedOutline {
      border-color: #760000;
      border-width: 2px;
    }
  `}
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  margin-top: 10px;
  .MuiOutlinedInput-root {
    background-color: ${props => props.disabled ? '#f0f0f0' : 'white'};
  }
  .MuiOutlinedInput-input {
    color: ${props => props.disabled ? '#999' : 'black'};
  }
`;

const certificates = [
  "기계설계산업기사", "생산자동화산업기사", "공조냉동산업기사", "컴퓨터응용가공산업기사",
  // ... 나머지 자격증 목록
];

const theme = createTheme({
  typography: {
    fontFamily: 'NanumSquareNeoBold, NanumSquareNeoLight, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'NanumSquareNeoBold';
          src: url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-bRg.eot);
          src: url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-bRg.eot?#iefix) format("embedded-opentype"), 
               url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-bRg.woff) format("woff"), 
               url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-bRg.ttf) format("truetype");
          font-weight: normal;
          font-style: normal;
        }
        @font-face {
          font-family: 'NanumSquareNeoLight';
          src: url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-aLt.eot);
          src: url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-aLt.eot?#iefix) format("embedded-opentype"), 
               url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-aLt.woff) format("woff"), 
               url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-aLt.ttf) format("truetype");
          font-weight: normal;
          font-style: normal;
        }
      `,
    },
  },
});

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 15px;
`;

/* 문제 등록의 입력필드(CustomTextField => 사각형 border의 문제 입력필드, UnderlinedTextField => 밑줄만 있는 선택지 입력필드) */
const CustomTextField = styled(TextField)`
  width: ${props => props.width || '100%'};
  & .MuiInputBase-root {
    height: ${props => props.height || 'auto'};
  }
`;

const UnderlinedTextField = styled(TextField)`
  width: ${props => props.width || '100%'};
  & .MuiInputBase-root {
  font-size: 15px;
  width: 550px;
    &:before {
      border-bottom: 1px solid rgba(0, 0, 0, 0.42);
    }
    &:after {
      border-bottom: 2px solid #6e8ab9;
    }
  }
  & .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-bottom: 2px solid rgba(0, 0, 0, 0.87);
  }
`;

const CustomCheckbox = styled(Checkbox)`
  &.MuiCheckbox-root {
    padding: 0px;
    margin-left: 20px;
    margin-top: 11px;
    margin-right: -15px;
  }
  .MuiSvgIcon-root {
    display: none;
  }
  &::before {
    content: "";
    display: block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid #b9b8b8;
    background-color: #fff;
    transition: all 0.2s;
  }
  &.Mui-checked::before {
    background-color: #5f7daf;
    border-color: #5f7daf;
  }
  &.Mui-checked::after {
    content: "✓";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 14px;
    font-weight: bold;
  }
`;


const OptionRowWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
  width: 100%;
  padding-left: 5px;
`;

/* 여기부터 파일 업로드 영역 */
const FileUploadArea = styled.div`
  margin-top: -10px;
  padding: 20px;
  border-radius: 8px;
`;

const FileUploadWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  width: 100%;
`;

const FileNameInput = styled.input`
  width: 500px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  font-size: 15px;
  padding: 5px 0;
  margin-left: -9px;
  background-color: transparent;
  &:focus {
    outline: none;
    border-bottom: 2px solid #6e8ab9;
  }
  &::placeholder {
    color: rgba(0, 0, 0, 0.42);
  }
`;

const UploadButton = styled.button`
  background: none;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  color: #6e8ab9;
  cursor: pointer;
  font-size: 14px;
  padding: 5px 10px;
  margin-left: 10px;
  font-family: 'NanumSquareNeoBold', sans-serif;
  font-weight: bold;
  &:hover {
    border-bottom: 2px solid #6e8ab9;
  }
`;

/* 여기부터 등록된 문제 영역 */
const RegisteredQuestionsArea = styled.div`
  margin-top: 0px;
  padding: 5px;
  border-radius: 8px;
`;

const RegisteredQuestion = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  position: relative;
  text-align: left;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #d32f2f;
  cursor: pointer;
  font-size: 18px;
`;

const RegisteredQuestionTitle = styled.div`
  font-family: 'NanumSquareNeoBold', sans-serif;
  font-size: 18px;
  color: #575f44;
  margin-bottom: 15px; // 문항제목 아래 간격
  padding: 8px;
`;

const RegisteredQuestionOptions = styled.ol`
  padding-left: 28px;
  margin-top: 10px;
`;

const RegisteredQuestionOption = styled.li`
  margin-bottom: 5px;
  color: ${props => props.isCorrect ? '#4CAF50' : 'inherit'};
  font-weight: ${props => props.isCorrect ? 'bold' : 'normal'};
`;

const RegisteredQuestionNote = styled.p`
  margin-top: 10px;
  font-style: italic;
  color: #666;
  margin-left: 10px;
`;

const RegisteredQuestionFile = styled.p`
  margin-top: 10px;
  color: #1976d2;
  margin-left: 10px;
`;

/* 문제속성, 문제작성, 등록된 문제 영역을 구분하는 border 컴포넌트 */
const StyledCertWriteContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledCertWriteLeft = styled.div`
  width: 22%;
  padding-right: 20px;
  border-right: 1px solid #a5a5a5;
`;

const StyledCertWriteRight = styled.div`
  width: 75%;
`;

const QuestionInputArea = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px solid #a5a5a5;
`;




const CertificationWrite = () => {
  const navigate = useNavigate();
  const [questionType, setQuestionType] = useState('');
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [certificateError, setCertificateError] = useState(false);
  const [questionCount, setQuestionCount] = useState('');


  const [questionTitle, setQuestionTitle] = useState('');
  const [options, setOptions] = useState([]);
  const [answers, setAnswers] = useState([]);

  /* 파일 업로드 관련 */
  const [uploadedFile, setUploadedFile] = useState(null);
  const formRef = useRef(null);
  const fileInputRef = useRef(null);

  /* 등록된 문제 관련 */
  const [registeredQuestions, setRegisteredQuestions] = useState([]);


  const handleSubmit = () => {
    if (!selectedCertificate || !questionTitle || (questionType === '객관식' && options.length === 0)) {
      // 에러 처리
      return;
    }

    const newQuestion = {
      certificate: selectedCertificate,
      type: questionType,
      question: questionTitle,
      options: questionType === '객관식' ? options : null,
      answers: questionType === '객관식' ? answers : null,
      note: questionType === '주관식' ? options[0] : null,
      file: uploadedFile,
    };

    setRegisteredQuestions(prev => [...prev, newQuestion]);
    resetForm();
  };

  const resetForm = () => {
    setQuestionType('');
    setQuestionCount('');
    setQuestionTitle('');
    setOptions([]);
    setAnswers([]);
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  /* 여기부터 오른쪽 문제 작성 영역 */

  useEffect(() => {
    if (questionType === '객관식' && questionCount) {
      const count = Math.min(parseInt(questionCount), 5); // 최대 6개로 제한
      setQuestionCount(count.toString());
      setOptions(Array(count).fill(''));
      setAnswers(Array(count).fill(false));
    } else {
      setOptions([]);
      setAnswers([]);
    }
  }, [questionType, questionCount]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAnswerChange = (index) => {
    const newAnswers = [...answers];
    newAnswers[index] = !newAnswers[index];
    setAnswers(newAnswers);
  };


  /* 파일 업로드 관련 */
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  /* 등록된 문제 영역 관련 */
  const handleDeleteQuestion = (index) => {
    setRegisteredQuestions(prev => prev.filter((_, i) => i !== index));
  };



  return (
    <ThemeProvider theme={theme}>
      <div className="cert-write-container">
        <div className="cert-write-header">
          <div onClick={() => navigate('/board/certification')} className="board-title">
            <FontAwesomeIcon icon={faPenToSquare} /> 문제은행 게시판
          </div>
        </div>
        <StyledCertWriteContent className="cert-write-content">
          <StyledCertWriteLeft className="cert-write-left">
            <div className="cert-section-title">문제 속성</div>
            <div className="cert-section-subtitle">자격증 선택</div>
            <StyledAutocomplete
              options={certificates}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="자격증을 선택/입력"
                  InputLabelProps={{ shrink: true }}
                />
              )}
              value={selectedCertificate}
              onChange={(event, newValue) => {
                setSelectedCertificate(newValue);
                setCertificateError(false);
              }}
              $error={certificateError}
            />
            <div className="cert-section-subtitle">문제형식 지정</div>
            <div className="question-type-buttons">
              <button
                type="button"
                onClick={() => setQuestionType('객관식')}
                className={questionType === '객관식' ? 'active' : ''}
              >
                객관식
              </button>
              <button
                type="button"
                onClick={() => setQuestionType('주관식')}
                className={questionType === '주관식' ? 'active' : ''}
              >
                주관식
              </button>
            </div>
            <StyledTextField
              label="문항 갯수"
              type="number"
              value={questionCount}
              onChange={(e) => setQuestionCount(Math.min(parseInt(e.target.value), 6).toString())}
              disabled={questionType !== '객관식'}
              InputProps={{
                inputProps: {
                  min: 1,
                  max: 5
                }
              }}
            />
            <div className="cert-section-subtitle">등록/리셋</div>
            <ButtonGroup>
              <Button
                onClick={handleSubmit}
                variant="outlined"
                className="submit-button"
              >
                <FontAwesomeIcon icon={faCheck} />
              </Button>
              <Button
                onClick={resetForm}
                variant="outlined"
                className="reset-button"
              >
                <FontAwesomeIcon icon={faRotateRight} />
              </Button>
            </ButtonGroup>
          </StyledCertWriteLeft>

          {/* 오른쪽 영역 시작 */}
          <StyledCertWriteRight className="cert-write-right">
            <QuestionInputArea>
              <div className="cert-section-title">문제 작성</div>
              <div className="question-input-area">
                <CustomTextField
                  label="문제"
                  value={questionTitle}
                  onChange={(e) => setQuestionTitle(e.target.value)}
                  margin="normal"
                  width="100%"
                  height="50px"
                  variant="outlined"
                />
                {questionType === '객관식' && options.map((option, index) => (
                  <OptionRowWrapper key={index}>
                    <UnderlinedTextField
                      placeholder={`선택지 ${index + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      margin="normal"
                      width="calc(100% - 50px)"
                      variant="standard"
                    />
                    <FormControlLabel
                      control={
                        <CustomCheckbox
                          checked={answers[index]}
                          onChange={() => handleAnswerChange(index)}
                          color="primary"
                        />
                      }
                      label=""
                    />
                  </OptionRowWrapper>
                ))}
                {questionType === '주관식' && (
                  <CustomTextField
                    label="정답"
                    value={options[0] || ''}
                    onChange={(e) => handleOptionChange(0, e.target.value)}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    width="100%"
                    variant="outlined"
                  />
                )}
              </div>

              <div className="cert-section-title" style={{ marginTop: '20px' }}>문제 작성(파일 업로드)</div>
              <FileUploadArea>
                <FileUploadWrapper>
                  <FileNameInput
                    type="text"
                    placeholder="사진 등 참고자료를 업로드"
                    value={uploadedFile ? uploadedFile.name : ''}
                    readOnly
                  />
                  <UploadButton onClick={triggerFileInput}>
                    <FontAwesomeIcon icon={faUpload} /> 파일찾기
                  </UploadButton>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                </FileUploadWrapper>
              </FileUploadArea>
            </QuestionInputArea>

              <div className="cert-section-title" style={{ marginTop: '40px' }}>작성한 문제</div>
              <RegisteredQuestionsArea>
                {registeredQuestions.map((q, index) => (
                  <RegisteredQuestion key={index}>
                    <DeleteButton onClick={() => handleDeleteQuestion(index)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </DeleteButton>
                    <RegisteredQuestionTitle>{index + 1}. {q.question}</RegisteredQuestionTitle>
                    {q.type === '객관식' && (
                      <RegisteredQuestionOptions>
                        {q.options.map((option, i) => (
                          <RegisteredQuestionOption key={i} isCorrect={q.answers[i]}>
                            {option} {q.answers[i] && ' (정답)'}
                          </RegisteredQuestionOption>
                        ))}
                      </RegisteredQuestionOptions>
                    )}
                    {q.type === '주관식' && <RegisteredQuestionNote>유의사항: {q.note}</RegisteredQuestionNote>}
                    {q.file && <RegisteredQuestionFile>첨부파일: {q.file.name}</RegisteredQuestionFile>}
                  </RegisteredQuestion>
                ))}
              </RegisteredQuestionsArea>
          </StyledCertWriteRight>
        </StyledCertWriteContent>
      </div>
    </ThemeProvider>
  );
};

export default CertificationWrite;
