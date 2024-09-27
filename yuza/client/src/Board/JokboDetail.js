import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    Chip,
    Container,
    Box,
    IconButton,
    Grid,
    FormControlLabel,
    TextField,
    Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import './jokbodetailstyle.css'

const HeaderContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    padding: theme.spacing(0, 0),
    marginBottom: theme.spacing(2),
}));

const TitleContainer = styled(Box)({
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    textAlign: 'center',
});

const InfoContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: theme.spacing(0.5),
    padding: theme.spacing(1),
    border: '1px solid #dcdbdc',
    // borderRadius: theme.shape.borderRadius,
    maxWidth: '200px', // 최대 너비 설정
    width: 'auto', // 내용에 맞게 자동 조절
}));

const InfoContainerWrapper = styled(Box)({
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
});

const LikeButton = styled(IconButton)(({ theme, isLiked }) => ({
    color: isLiked ? theme.palette.primary.main : theme.palette.grey[500],
    transition: 'color 0.3s, transform 0.1s',
    '&:active': {
        transform: 'scale(0.8)', // 더 큰 scale 변화
    },
    '& svg': {
        fontSize: '1.5rem', // 아이콘 크기 증가
    },
}));

const LikeButtonContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
});

const LikeCount = styled(Typography)({
    fontFamily: "'NanumSquareNeoLight', sans-serif",
    fontSize: '20px',
    marginLeft: '-10px',
    marginTop: '7px',
    fontWeight: 'Bold',
    color: 'grey'

});

const QuestionPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
}));

const AnswerChip = styled(Chip)(({ theme, iscorrect }) => ({
    marginLeft: theme.spacing(1),
    backgroundColor: iscorrect === 'true' ? theme.palette.success.light : theme.palette.error.light,
    color: theme.palette.common.white,
}));

// 게시글 제목 폰트 지정용
const TitleTypography = styled(Typography)({
    fontFamily: "'NanumSquareNeoBold', sans-serif",
    fontSize: '26px',
    fontWeight: 'Bold',
    color: '#333535',
});

// 세부정보 폰트 지정용
const InfoTypography = styled(Typography)({
    fontFamily: "'NanumSquareNeoLight', sans-serif",
});

// 여기부터는 ContentContainer
const ContentContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
}));

const QuestionSheetContainer = styled(Box)(({ theme }) => ({
    flex: 2,
    padding: theme.spacing(2),
    border: '1px solid #dcdbdc',
    // borderRadius: theme.shape.borderRadius,
}));

const AnswerSheetContainer = styled(Box)(({ theme }) => ({
    flex: 1,
    border: '1px solid #dcdbdc',
    // borderRadius: theme.shape.borderRadius,
    display: 'flex',
    flexDirection: 'column',
}));

// 문제들
const QuestionItem = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    textAlign: 'left',
    marginLeft: '0.5rem',
}));

const OptionItem = styled(Box)(({ theme, isSelected }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(0.5),
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

// 문항 선택지 속성
const OptionNumber = styled(Box)(({ theme, isSelected }) => ({
    width: '1.4rem',
    height: '1.4rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: isSelected ? 'transparent' : theme.palette.text.primary,
    backgroundColor: isSelected ? '#3a3e3e' : 'transparent',
    borderRadius: '50%',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    '&:hover': {
        backgroundColor: isSelected ? '#3a3e3e' : theme.palette.action.hover,
    },
    position: 'relative',
    marginRight: theme.spacing(1),
    '&::after': {
        content: isSelected ? '"\u2713"' : '""', // 체크 표시
        position: 'absolute',
        color: 'white',
        fontSize: '0.8rem',
    }
}));

// 선택지에 체크했다면? bold로 지정하는 속성임
const OptionText = styled(Typography)(({ isSelected }) => ({
    fontWeight: isSelected ? 'bold' : 'normal',
}));

// 문제지 영역 주관식 입력란
const QuestionSheetSubjectiveInput = styled(TextField)(({ theme }) => ({
    marginTop: theme.spacing(1),
    '& .MuiOutlinedInput-root': {
        borderRadius: '4px',
        backgroundColor: theme.palette.background.paper,
        '& fieldset': {
            borderColor: '#636464',
        },
        '&:hover fieldset': {
            borderColor: '#636464',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#636464',
        },
    },
    '& .MuiOutlinedInput-input': {
        padding: '10px 14px',
    },
}));

const AnswerSheetTitle = styled(Typography)(({ theme }) => ({
    fontFamily: "'NanumSquareNeoBold', sans-serif",
    fontSize: '1.2rem',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.grey[200],
    textAlign: 'center',
    color: 'grey(400)',
}));

const AnswerSheetContent = styled(Box)(({ theme }) => ({
    padding: theme.spacing(0.6, 2),  // 상단 패딩 줄임
}));

const AnswerItem = styled(Grid)(({ theme }) => ({
    display: 'flex',
    alignItems: 'stretch',
    padding: theme.spacing(1, 0),
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:last-child': {
        borderBottom: 'none',
    },
}));

const QuestionNumber = styled(Typography)({
    fontFamily: "'NanumSquareNeoBold', sans-serif",
    marginRight: '0rem',
    width: '2rem',
});

const AnswerOptions = styled(Box)({
    display: 'flex',
    gap: '0rem',
});

const AnswerOption = styled(Box)(({ theme, isSelected }) => ({
    width: '1.4rem',     // 선택지를 체크 할 때 크기
    height: '1.4rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '1.2rem',  // 선택지 크기
    fontWeight: 'bold',
    color: isSelected ? 'transparent' : theme.palette.text.primary,
    backgroundColor: isSelected ? '#3a3e3e' : 'transparent',
    borderRadius: '50%',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    '&:hover': {
        backgroundColor: isSelected ? '#3a3e3e' : theme.palette.action.hover,
    },
    position: 'relative',
    '&::after': {
        content: isSelected ? '"\u2713"' : '""', // 체크 표시
        position: 'absolute',
        color: 'white',
        fontSize: '0.8rem',
    }
}));

const VerticalDivider = styled(Divider)(({ theme }) => ({
    height: '100%',
    margin: theme.spacing(0, 1),
}));

// 주관식 답안 작성
const SubjectiveAnswerInput = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '22px',
        width: '160px',
        height: '26px',
        marginRight: '12px',
        fontSize: '12px',
        '& fieldset': {
            borderColor: '#636464',
        },
        '&:hover fieldset': {
            borderColor: '#636464',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#636464',
        },
    },
}));

// 실제 사용 시에는 이 데이터를 API에서 가져와야 합니다.
const mockJokboData = {
    id: 1,
    title: '정보처리기사 실기 문제',
    author: 'user1',
    createdAt: '2024-08-13T15:30:00',
    views: 150,
    likes: 10,
    certificate: '정보처리기사',
    questions: [
        {
            id: 1,
            type: '객관식',
            question: 'OSI 7계층 중 네트워크 계층의 주요 기능은?',
            options: [
                '데이터 전송',
                '라우팅',
                '세션 관리',
                '데이터 압축'
            ],
            answers: [false, true, false, false],
            images: ['/api/placeholder/400/200'],
        },
        {
            id: 2,
            type: '주관식',
            question: 'SQL에서 테이블의 구조를 변경하는 명령어는?',
            note: '대소문자를 구분하지 않습니다.',
            correctAnswer: 'ALTER TABLE',
        },
        {
            id: 3,
            type: '주관식',
            question: 'SQL에서 테이블의 구조를 변경하는 명령어는?',
            note: '대소문자를 구분하지 않습니다.',
            correctAnswer: 'ALTER TABLE',
        },
        {
            id: 4,
            type: '객관식',
            question: 'OSI 7계층 중 네트워크 계층의 주요 기능은?',
            options: [
                '데이터 전송',
                '라우팅',
                '세션 관리',
                '데이터 압축'
            ],
            answers: [false, true, false, false],
            images: ['/api/placeholder/400/200'],
        },
        {
            id: 5,
            type: '객관식',
            question: 'OSI 7계층 중 네트워크 계층의 주요 기능은?',
            options: [
                '데이터 전송',
                '라우팅',
                '세션 관리',
                '데이터 압축'
            ],
            answers: [false, true, false, false],
            images: ['/api/placeholder/400/200'],
        },
    ]
};

const JokboDetail = () => {
    const { id } = useParams(); // URL에서 족보 ID를 가져옵니다.
    // 실제 구현에서는 이 ID를 사용해 서버에서 데이터를 가져와야 합니다.
    const jokbo = mockJokboData; // 여기서는 목업 데이터를 사용합니다.
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(jokbo.likes);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [subjectiveAnswers, setSubjectiveAnswers] = useState({});

    const handleLike = () => {
        setIsLiked(true);
        setLikeCount(prevCount => prevCount + 1);
        setTimeout(() => setIsLiked(false), 500); // 0.5초로 증가
    };

    // 선택지 체크
    const handleQuestionOptionSelect = (questionId, optionIndex) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: optionIndex
        }));
    };

    const handleAnswerSelect = (questionId, optionIndex) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: optionIndex
        }));
    };

    const handleQuestionSubjectiveChange = (questionId, value) => {
        setSubjectiveAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const handleSubjectiveAnswerChange = (questionId, value) => {
        setSubjectiveAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };


    return (
        <div>
            <h2 className="jokbo-title">족보 게시판</h2>

            <Container maxWidth="md">
                <HeaderContainer>
                    <Grid container alignItems="center">
                        <Grid item xs={4}>
                            <LikeButtonContainer>
                                <LikeButton onClick={handleLike} isLiked={isLiked}>
                                    <FontAwesomeIcon icon={faThumbsUp} />
                                </LikeButton>
                                <LikeCount variant="body2">{likeCount}</LikeCount>
                            </LikeButtonContainer>
                        </Grid>
                        <Grid item xs={4}>
                            <TitleContainer>
                                <TitleTypography variant="h4">{jokbo.title}</TitleTypography>
                            </TitleContainer>
                        </Grid>
                        <Grid item xs={4}>
                            <InfoContainerWrapper>
                                <InfoContainer>
                                    <InfoTypography variant="subtitle2">{jokbo.certificate}</InfoTypography>
                                    <InfoTypography variant="subtitle2">{jokbo.author}</InfoTypography>
                                    <InfoTypography variant="caption">{new Date(jokbo.createdAt).toLocaleString()}</InfoTypography>
                                </InfoContainer>
                            </InfoContainerWrapper>
                        </Grid>
                    </Grid>
                </HeaderContainer>

                <ContentContainer>
                    <QuestionSheetContainer>
                        <Typography variant="h6" gutterBottom></Typography>
                        {jokbo.questions.map((q, index) => (
                            <QuestionItem key={q.id}>
                                <Typography variant="subtitle1">
                                    {index + 1}. {q.question}
                                </Typography>
                                {q.type === '객관식' && (
                                    <Box ml={2}>
                                        {q.options.map((option, i) => (
                                            <OptionItem
                                                key={i}
                                                isSelected={selectedAnswers[q.id] === i}
                                                onClick={() => handleQuestionOptionSelect(q.id, i)}
                                            >
                                                <OptionNumber isSelected={selectedAnswers[q.id] === i}>
                                                    {['①', '②', '③', '④', '⑤'][i]}
                                                </OptionNumber>
                                                <OptionText isSelected={selectedAnswers[q.id] === i}>
                                                    {option}
                                                </OptionText>
                                            </OptionItem>
                                        ))}
                                    </Box>
                                )}
                                {q.type === '주관식' && (
                                    <Box ml={2}>
                                        <Typography variant="body2" style={{ marginTop: '5px' }}>
                                            유의사항: {q.note}
                                        </Typography>
                                        <QuestionSheetSubjectiveInput
                                            // fullWidth
                                            variant="standard"   // 입력란 속성 구분
                                            size="small"
                                            placeholder="답안 입력"
                                            value={subjectiveAnswers[q.id] || ''}
                                            onChange={(e) => handleQuestionSubjectiveChange(q.id, e.target.value)}
                                            multiline
                                            rows={1}
                                        />
                                    </Box>
                                )}
                            </QuestionItem>
                        ))}
                    </QuestionSheetContainer>

                    <AnswerSheetContainer>
                        <AnswerSheetTitle>답안 표기란</AnswerSheetTitle>
                        <AnswerSheetContent>
                            {jokbo.questions.map((q, index) => (
                                <React.Fragment key={q.id}>
                                    <AnswerItem container spacing={3}>
                                        <Grid item xs={2}>
                                            <QuestionNumber>{index + 1}</QuestionNumber>
                                        </Grid>
                                        <VerticalDivider orientation="vertical" flexItem />
                                        <Grid item xs>
                                            {q.type === '객관식' ? (
                                                <AnswerOptions>
                                                    {['①', '②', '③', '④'].map((option, i) => (
                                                        <AnswerOption
                                                            key={i}
                                                            isSelected={selectedAnswers[q.id] === i}
                                                            onClick={() => handleAnswerSelect(q.id, i)}
                                                        >
                                                            {option}
                                                        </AnswerOption>
                                                    ))}
                                                </AnswerOptions>
                                            ) : (
                                                <SubjectiveAnswerInput
                                                    variant="outlined"
                                                    size="small"
                                                    placeholder="답안 입력"
                                                    value={subjectiveAnswers[q.id] || ''}
                                                    onChange={(e) => handleSubjectiveAnswerChange(q.id, e.target.value)}
                                                />
                                            )}
                                        </Grid>
                                    </AnswerItem>
                                    {index !== jokbo.questions.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </AnswerSheetContent>
                    </AnswerSheetContainer>
                </ContentContainer>
            </Container>
        </div>
    );
};

export default JokboDetail;