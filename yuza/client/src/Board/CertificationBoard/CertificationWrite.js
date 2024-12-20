import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CertificationService from './CertificationService';
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
import axios from 'axios';

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
    .MuiAutocomplete-listbox {
      &::-webkit-scrollbar {
        display: none;
      }
      -ms-overflow-style: none;
      scrollbar-width: none;
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
  min-height: 750px;  // 문제속성과 <-> 제목,문제작성,작성한 문제를 구분하는 border
`;

const StyledCertWriteLeft = styled.div`
  width: 22%;
  padding-right: 20px;
  border-right: 1px solid #a5a5a5;
`;

const StyledCertWriteRight = styled.div`
  width: 75%;
  min-height: 750px;
`;

const QuestionInputArea = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px solid #a5a5a5;
`;

const TitleInputArea = styled.div`
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #a5a5a5;
`;

const TitleInputWrapper = styled.div`
  width: 73%;  // 이 값을 조절하여 입력란의 너비를 변경할 수 있습니다.
  margin-left: 5px;
`;



const CertificationWrite = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(''); // 게시글 제목
  const [questionType, setQuestionType] = useState('');
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [certificateError, setCertificateError] = useState(false);


  const [questionTitle, setQuestionTitle] = useState('');
  const [options, setOptions] = useState([]);
  const [answers, setAnswers] = useState([]);

  /* 파일 업로드 관련 */
  const [uploadedFile, setUploadedFile] = useState(null);
  const formRef = useRef(null);
  const fileInputRef = useRef(null);

  /* 등록된 문제 관련 */
  const [registeredQuestions, setRegisteredQuestions] = useState([]);


  // 등록된 문제 영역에 문제 등록
  const handleAddQuestion = () => {
    if (!questionTitle || (questionType === '객관식' && options.length === 0)) {
      // 에러 처리
      setCertificateError(false);
      return;
    }

    const newQuestion = {
      type: questionType,
      question: questionTitle,
      options: questionType === '객관식' ? options : null,
      answers: questionType === '객관식' ? answers : null,
      note: questionType === '주관식' ? options[0] : null,
    };

    setRegisteredQuestions(prev => [...prev, newQuestion]);
    resetForm();
  };


  // 게시글 등록 함수
  const handlePublish = async () => {
    if (!selectedCertificate || !title || registeredQuestions.length === 0) {
      alert('자격증 선택, 제목 입력, 그리고 최소 1개의 문제를 등록해야 합니다.');
      return;
    }

    // 여기에 실제 게시글 등록 로직 구현
    const postData = {
      user_id: '테스트 유저', // 실제 사용자 ID로 대체해야 함
      certificate_id: selectedCertificate.certificate_id,
      question_title: title,
      questions: registeredQuestions.map(q => ({
        question_content: q.question,
        question_explanation: q.type === '주관식' ? q.note : '임시 해설',
        question_tag: '임시 태그', // 적절한 태그로 대체해야 함
        question_type: q.type,
        options: q.type === '객관식' ? q.options.map((option, index) => ({
          options_num: index + 1,
          options_content: option,
          is_correct: q.answers[index] ? 1 : 0
        })) : null
      }))
    };

    console.log('게시글 등록:', postData);
    // TODO: API 호출 등의 실제 등록 로직 추가

    try {
      const response = await CertificationService.createCertification(postData);
      alert('게시글이 성공적으로 등록되었습니다!');
      navigate('/board/cert'); // 등록 후 문제은행 게시판으로 이동
    } catch (error) {
      console.error('게시글 등록 중 오류 발생:', error);
      alert('게시글 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // const resetForm = () => {
  //   setQuestionType('');
  //   setQuestionCount('');
  //   setQuestionTitle('');
  //   setOptions([]);
  //   setAnswers([]);
  //   setUploadedFile(null);
  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = '';
  //   }
  // };

  const resetForm = () => {
    setQuestionType('');
    setQuestionTitle('');
    setOptions([]);
    setAnswers([]);
  };

  /* 여기부터 오른쪽 문제 작성 영역 */

  useEffect(() => {
    if (questionType === '객관식') {
      setOptions(Array(4).fill(''));
      setAnswers(Array(4).fill(false));
    } else {
      setOptions([]);
      setAnswers([]);
    }
  }, [questionType]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/Certification/certificates'); // 백엔드에서 자격증 목록을 가져옴
        setCertificates(response.data); // 가져온 자격증 목록을 상태에 저장
      } catch (error) {
        console.error('자격증 목록 불러오기 실패:', error);
      }
    };
    fetchCertificates();
  }, []);

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
          <span
              onClick={() => navigate('/board/cert')}
              className="board-title"
              style={{ cursor: 'pointer' }}
          >
            <FontAwesomeIcon icon={faPenToSquare} /> 문제은행 게시판
          </span>
            <button onClick={handlePublish} className="cert-publish-button">등록</button>
          </div>
          <StyledCertWriteContent className="cert-write-content">
            <StyledCertWriteLeft className="cert-write-left">
              <div className="cert-section-title">문제 속성</div>
              <div className="cert-section-subtitle">자격증 선택</div>
              {/* <StyledAutocomplete*/}
              {/*  options={certificates}*/}
              {/*  renderInput={(params) => (*/}
              {/*    <TextField*/}
              {/*      {...params}*/}
              {/*      placeholder="자격증을 선택/입력"*/}
              {/*      InputLabelProps={{ shrink: true }}*/}
              {/*    />*/}
              {/*  )}*/}
              {/*  value={selectedCertificate}*/}
              {/*  onChange={(event, newValue) => {*/}
              {/*    setSelectedCertificate(newValue);*/}
              {/*    setCertificateError(false);*/}
              {/*  }}*/}
              {/*  $error={certificateError}*/}
              {/*/> */}

              {/* Autocomplete를 사용한 자격증 선택탭 구현 */}
              {/*DB와 연결해서 자격증 목록을 불러옴 */}
              <Autocomplete
                  options={certificates} // API에서 가져온 자격증 목록을 옵션으로 제공
                  getOptionLabel={(option) => option.certificate_name} // 자격증 이름을 라벨로 표시
                  renderInput={(params) => (
                      <TextField
                          {...params}
                          placeholder="자격증을 선택/입력"
                          InputLabelProps={{ shrink: true }}
                      />
                  )}
                  value={selectedCertificate} // 선택된 자격증
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
              <div className="cert-section-subtitle">등록/리셋</div>
              <ButtonGroup>
                <Button
                    onClick={handleAddQuestion}
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
              <TitleInputArea>
                <div className="cert-section-title">제목</div>
                <TitleInputWrapper>
                  <CustomTextField
                      label="제목을 입력하세요"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      margin="normal"
                      height="50px"
                      variant="outlined"
                  />
                </TitleInputWrapper>
              </TitleInputArea>
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