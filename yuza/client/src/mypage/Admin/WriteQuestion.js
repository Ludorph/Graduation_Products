// import React, { useState, useRef, useEffect } from 'react';
// import { TextField, ThemeProvider, LinearProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button, createTheme, Checkbox, FormControlLabel, Autocomplete } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheck, faPenToSquare, faRotateRight, faNoteSticky } from '@fortawesome/free-solid-svg-icons';
// import './writequestion.css';
// import addImageIcon from '../../img/boardimg/add-image-icon.png';
// import styled, { keyframes, css } from 'styled-components';

// // 이미지 업로드 모달창
// const StyledDialog = styled(Dialog)`
//   .MuiDialog-paper {
//     background-color: #f8f9fa;
//     border-radius: 10px;
//     padding: 16px;
//   }
// `;



// // 자격증 선택 select-box 관련(흔들리는 애니메이션)
// const shakeAnimation = keyframes`
//   0% { transform: translateX(0); }
//   25% { transform: translateX(-5px); }
//   50% { transform: translateX(5px); }
//   75% { transform: translateX(-5px); }
//   100% { transform: translateX(0); }
// `;

// // 게시물 제목 입력란
// const ExpandingTextField = styled(TextField)`
//   transition: width 0.3s ease-in-out;
//   width: ${props => props.expanded ? '300px' : '150px'};
//   ${props => props.$error && css`
//     animation: ${shakeAnimation} 0.5s ease-in-out;
//     .MuiOutlinedInput-notchedOutline {
//       border-color: #760000;
//       border-width: 2px;
//     }
//   `}
// `;

// // error prop가 true면 흔들리는 애니메이션과 빨간색 테두리를 적용
// const StyledAutocomplete = styled(Autocomplete)`
//   width: 300px;  // 선택창 가로길이 
//   ${props => props.$error && css`
//     animation: ${shakeAnimation} 0.5s ease-in-out;
//     .MuiOutlinedInput-notchedOutline {
//       border-color: #760000;
//       border-width: 2px;
//     }
//   `}
// `;

// const HeaderContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: 20px;
// `;


// const certificates = [
//   "기계설계산업기사", "생산자동화산업기사", "공조냉동산업기사", "컴퓨터응용가공산업기사",
//   // ... 나머지 자격증 목록
// ];

// const theme = createTheme({
//   typography: {
//     fontFamily: 'NanumSquareNeoBold, NanumSquareNeoLight, sans-serif',
//   },
//   components: {
//     MuiCssBaseline: {
//       styleOverrides: `
//         @font-face {
//           font-family: 'NanumSquareNeoBold';
//           src: url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-bRg.eot);
//           src: url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-bRg.eot?#iefix) format("embedded-opentype"), 
//                url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-bRg.woff) format("woff"), 
//                url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-bRg.ttf) format("truetype");
//           font-weight: normal;
//           font-style: normal;
//         }
//         @font-face {
//           font-family: 'NanumSquareNeoLight';
//           src: url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-aLt.eot);
//           src: url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-aLt.eot?#iefix) format("embedded-opentype"), 
//                url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-aLt.woff) format("woff"), 
//                url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-aLt.ttf) format("truetype");
//           font-weight: normal;
//           font-style: normal;
//         }
//       `,
//     },
//     MuiLinearProgress: {
//       styleOverrides: {
//         root: {
//           backgroundColor: '#d7b03d',
//           height: 10,
//           borderRadius: 5,
//         },
//         bar: {
//           backgroundColor: '#a88a33',
//         },
//       },
//     },
//     // palette: {
//     //   primary: {
//     //     main: '#ff0000',
//     //   },
//     // },
//   },
// });

// // AdminSetQuestion.js에서 WriteQuestion 컴포넌트에 onQuestionAdded prop을 전달(완성된 문제)
// function WriteQuestion({ onClose, onQuestionAdded, editingQuestion }) {
//   const navigate = useNavigate();
//   const formRef = useRef(null);
//   const [questionType, setQuestionType] = useState('');
//   const [question, setQuestion] = useState('');
//   const [optionCount, setOptionCount] = useState(0);
//   const [options, setOptions] = useState([]);
//   const [note, setNote] = useState('');
//   const [registeredQuestions, setRegisteredQuestions] = useState([]);
//   const [answers, setAnswers] = useState([]);
//   // 이미지 업로드 관련 속성들
//   const [images, setImages] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');
//   // 이미지 업로드 오류 모달창 속성들
//   const [openModal, setOpenModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState('');
//   // 자격증 선택 select-box
//   const [selectedCertificate, setSelectedCertificate] = useState(null);
//   const [certificateError, setCertificateError] = useState(false);
//   // 게시물 입력란 관련
//   const [title, setTitle] = useState('');
//   const [titleExpanded, setTitleExpanded] = useState(false);
//   const [titleError, setTitleError] = useState(false);


//   // 등록된 문제 수정관련
//   const [editingIndex, setEditingIndex] = useState(null);

//   useEffect(() => {
//     if (editingQuestion) {
//       // 수정 모드일 때 초기 상태 설정
//       setTitle(editingQuestion.title);
//       setSelectedCertificate(editingQuestion.certificate);
//       setQuestionType(editingQuestion.type);
//       setQuestion(editingQuestion.question);
//       if (editingQuestion.type === '객관식') {
//         setOptions(editingQuestion.options || []);
//         setAnswers(editingQuestion.answers || []);
//         setOptionCount(editingQuestion.options ? editingQuestion.options.length : 0);
//       } else {
//         setNote(editingQuestion.note || '');
//       }
//       setImages(editingQuestion.images ? editingQuestion.images.map(url => ({ preview: url })) : []);
//     }
//   }, [editingQuestion]);

//   const handleTitleFocus = () => {
//     setTitleExpanded(true);
//   };

//   const handleTitleBlur = () => {
//     setTitleExpanded(false);
//   };
//   const handleCompleteWriting = () => {
//     let hasError = false;

//     if (!title) {
//       setTitleError(true);
//       setTimeout(() => setTitleError(false), 500);
//       hasError = true;
//     }

//     if (!selectedCertificate) {
//       setCertificateError(true);
//       setTimeout(() => setCertificateError(false), 500);
//       hasError = true;
//     }

//     if (!hasError) {
//       const newQuestion = {
//         title: title,
//         certificate: selectedCertificate,
//         type: questionType,
//         question: question,
//         options: questionType === '객관식' ? options : null,
//         answers: questionType === '객관식' ? answers : null,
//         note: questionType === '주관식' ? note : null,
//         images: images.map(img => img.preview),
//       };
//       onQuestionAdded(newQuestion);
//       onClose();
//     }
//   };


//   const handleQuestionTypeChange = (type) => {
//     setQuestionType(type);
//     setOptions([]);
//     setOptionCount(0);
//   };

//   const handleOptionCountChange = (event) => {
//     const count = Math.min(parseInt(event.target.value), 6); // 최대 6개로 제한
//     setOptionCount(count);
//     setOptions(Array(count).fill(''));
//     setAnswers(Array(count).fill(false));
//   };

//   const handleOptionChange = (index, value) => {
//     const newOptions = [...options];
//     newOptions[index] = value;
//     setOptions(newOptions);
//   };

//   const handleAnswerChange = (index) => {
//     const newAnswers = [...answers];
//     newAnswers[index] = !newAnswers[index];
//     setAnswers(newAnswers);
//   };

//   // 이미지 업로드 부분
//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (images.length + files.length > 2) {
//       setModalMessage('최대 2개의 이미지만 업로드할 수 있습니다.');
//       setOpenModal(true);
//       return;
//     }

//     const newImages = files.map(file => ({
//       file,
//       preview: URL.createObjectURL(file)
//     }));
//     setImages(prevImages => [...prevImages, ...newImages]);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!selectedCertificate) {
//       setCertificateError(true);
//       setTimeout(() => setCertificateError(false), 500);
//       return;
//     }
//     const newQuestion = {
//       type: questionType,
//       question: question,
//       options: questionType === '객관식' ? options : null,
//       answers: questionType === '객관식' ? answers : null,
//       note: questionType === '주관식' ? note : null,
//       images: images.map(img => img.preview),
//       certificate: selectedCertificate
//     };
//     if (editingIndex !== null) {
//       const updatedQuestions = [...registeredQuestions];
//       updatedQuestions[editingIndex] = newQuestion;
//       setRegisteredQuestions(updatedQuestions);
//       setEditingIndex(null);
//     } else {
//       setRegisteredQuestions([...registeredQuestions, newQuestion]);
//     }
//     resetForm();
//   };

//   const resetForm = () => {
//     setQuestionType('');
//     setQuestion('');
//     setOptions([]);
//     setOptionCount(0);
//     setNote('');
//     setAnswers([]);
//     setImages([]);
//     setErrorMessage('');
//   };

//   const handleExternalSubmit = () => {
//     if (formRef.current) {
//       formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
//     }
//   };

//   useEffect(() => {
//     // Clean up the URLs when component unmounts
//     return () => {
//       images.forEach(image => URL.revokeObjectURL(image.preview));
//     };
//   }, [images]);


//   // 문제 등록영역 퍼센트바 부분
//   const MAX_QUESTIONS = 40;
//   const progressPercentage = (registeredQuestions.length / MAX_QUESTIONS) * 100;

//   const handleCancel = () => {
//     onClose();
//   };


//   // 등록된 문제를 수정하는 클릭 핸들러
//   const handleEdit = (index) => {
//     const questionToEdit = registeredQuestions[index];
//     setQuestionType(questionToEdit.type);
//     setQuestion(questionToEdit.question);
//     if (questionToEdit.type === '객관식') {
//       setOptions(questionToEdit.options);
//       setAnswers(questionToEdit.answers);
//       setOptionCount(questionToEdit.options.length);
//     } else {
//       setNote(questionToEdit.note);
//     }
//     setImages(questionToEdit.images.map(url => ({ preview: url })));
//     setSelectedCertificate(questionToEdit.certificate);
//     setEditingIndex(index);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <div className="cert-write-container">
//         <div className="question-register-background">
//           <div className="question-register-area">
//             <HeaderContainer>
//               <p><FontAwesomeIcon icon={faPenToSquare} /> 문제 등록</p>
//               <ExpandingTextField
//                 label="게시물 제목"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 onFocus={handleTitleFocus}
//                 onBlur={handleTitleBlur}
//                 expanded={titleExpanded}
//                 $error={titleError}
//               // $error prop 전달로 입력란이 비었을 시 애니메이션 효과 적용
//               />
//               <StyledAutocomplete
//                 options={certificates}
//                 renderInput={(params) => <TextField {...params} label="자격증 선택" />}
//                 value={selectedCertificate}
//                 onChange={(event, newValue) => {
//                   setSelectedCertificate(newValue);
//                 }}
//                 $error={certificateError}
//               />
//             </HeaderContainer>
//             <form ref={formRef} onSubmit={handleSubmit}>
//               <div className="question-type-buttons">
//                 <Button
//                   onClick={() => handleQuestionTypeChange('객관식')}
//                   className={questionType === '객관식' ? 'active' : ''}
//                 >
//                   객관식
//                 </Button>
//                 <Button
//                   onClick={() => handleQuestionTypeChange('주관식')}
//                   className={questionType === '주관식' ? 'active' : ''}
//                 >
//                   주관식
//                 </Button>
//               </div>

//               <TextField
//                 label="문제"
//                 value={question}
//                 onChange={(e) => setQuestion(e.target.value)}
//                 fullWidth
//                 margin="normal"
//               />

//               {questionType === '객관식' && (
//                 <div>
//                   <div className="option-count-input">
//                     <TextField
//                       label="선택지 개수"
//                       type="number"
//                       value={optionCount}
//                       onChange={handleOptionCountChange}
//                       inputProps={{ min: 1, max: 6 }}
//                       fullWidth
//                       sx={{ width: '120px' }}  // Material-UI의 sx prop 사용
//                     />
//                   </div>
//                   {options.map((option, index) => (
//                     <div key={index} className="option-row">
//                       <TextField
//                         label={`선택지 ${index + 1}`}
//                         value={option}
//                         onChange={(e) => handleOptionChange(index, e.target.value)}
//                         fullWidth
//                         margin="normal"
//                       />
//                       <FormControlLabel
//                         control={
//                           <Checkbox
//                             checked={answers[index]}
//                             onChange={() => handleAnswerChange(index)}
//                             color="primary"
//                           />
//                         }
//                         label=""
//                       />
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {questionType === '주관식' && (
//                 <TextField
//                   label="유의사항"
//                   value={note}
//                   onChange={(e) => setNote(e.target.value)}
//                   fullWidth
//                   margin="normal"
//                   multiline
//                   rows={4}
//                 />
//               )}

//               {(questionType === '객관식' && optionCount > 0) || questionType === '주관식' ? (
//                 <div className="image-upload-area">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     style={{ display: 'none' }}
//                     id="image-upload"
//                     multiple
//                   />
//                   <label htmlFor="image-upload" className="image-upload-button">
//                     <img src={addImageIcon} alt="이미지 추가" className="add-image-icon" />
//                   </label>
//                   <div className="preview-images">
//                     {images.map((image, index) => (
//                       <img key={index} src={image.preview} alt={`미리보기 ${index + 1}`} className="preview-image" />
//                     ))}
//                   </div>
//                 </div>
//               ) : null}
//               {errorMessage && <p className="error-message">{errorMessage}</p>}
//             </form>
//           </div>
//           {/* 문제 등록영역 퍼센트바 부분 */}
//           <div className="progress-area-background">
//             <div className="progress-area">
//               <div className="progress-info">
//                 <p>{progressPercentage.toFixed(0)}% completed</p>
//                 <LinearProgress variant="determinate" value={progressPercentage} />
//               </div>
//               <div className="button-group">
//                 <Button
//                   onClick={handleExternalSubmit}
//                   variant="contained"
//                   color="primary"
//                   className="submit-button"
//                 >
//                   <FontAwesomeIcon icon={faCheck} />
//                 </Button>
//                 <Button
//                   onClick={resetForm}
//                   variant="contained"
//                   color="secondary"
//                   className="reset-button"
//                 >
//                   <FontAwesomeIcon icon={faRotateRight} />
//                 </Button>
//                 <Button
//                   onClick={handleCompleteWriting}
//                   variant="contained"
//                   color="primary"
//                   className="complete-button"
//                 >
//                   작성완료
//                 </Button>
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   onClick={handleCancel}
//                   className="cancel-button"
//                 >
//                   작성취소
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="registered-questions-area">
//           <p><FontAwesomeIcon icon={faNoteSticky} /> 등록된 문제</p>
//           {registeredQuestions.map((q, index) => (
//             <div key={index} className="registered-question">
//               <div className="question-header">
//                 <p className="question-title">
//                   <span className="question-number">{index + 1}. </span>
//                   {q.question}
//                 </p>
//                 <FontAwesomeIcon
//                   icon={faPenToSquare}
//                   onClick={() => handleEdit(index)}
//                   className="edit-icon"
//                 />
//               </div>
//               {q.images && q.images.length > 0 && (
//                 <div className="question-images">
//                   {q.images.map((image, i) => (
//                     <img key={i} src={image} alt={`문제 ${index + 1} 이미지 ${i + 1}`} className="preview-image" />
//                   ))}
//                 </div>
//               )}
//               {q.type === '객관식' && (
//                 <ol className="options-list">
//                   {q.options.map((option, i) => (
//                     <li
//                       key={i}
//                       className={`option-item ${q.answers[i] ? 'correct-answer' : ''}`}
//                     >
//                       {option}
//                     </li>
//                   ))}
//                 </ol>
//               )}
//               {q.type === '주관식' && <p className="add-info">유의사항: {q.note}</p>}
//             </div>
//           ))}
//         </div>


//         <StyledDialog open={openModal} onClose={handleCloseModal}>
//           <DialogTitle>알림</DialogTitle>
//           <DialogContent>
//             <p>{modalMessage}</p>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCloseModal} color="primary">
//               확인
//             </Button>
//           </DialogActions>
//         </StyledDialog>
//       </div>
//     </ThemeProvider>
//   );
// }

// export default WriteQuestion;