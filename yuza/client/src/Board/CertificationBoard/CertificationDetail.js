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
import './certificationdetailstyle.css'

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
    maxWidth: '200px',
    width: 'auto',
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
        transform: 'scale(0.8)',
    },
    '& svg': {
        fontSize: '1.5rem',
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

const TitleTypography = styled(Typography)({
    fontFamily: "'NanumSquareNeoBold', sans-serif",
    fontSize: '26px',
    fontWeight: 'Bold',
    color: '#333535',
});

const InfoTypography = styled(Typography)({
    fontFamily: "'NanumSquareNeoLight', sans-serif",
});

const ContentContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
}));

const QuestionSheetContainer = styled(Box)(({ theme }) => ({
    flex: 2,
    padding: theme.spacing(2),
    border: '1px solid #dcdbdc',
}));

const AnswerSheetContainer = styled(Box)(({ theme }) => ({
    flex: 1,
    border: '1px solid #dcdbdc',
    display: 'flex',
    flexDirection: 'column',
}));

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
        content: isSelected ? '"\u2713"' : '""',
        position: 'absolute',
        color: 'white',
        fontSize: '0.8rem',
    }
}));

const OptionText = styled(Typography)(({ isSelected }) => ({
    fontWeight: isSelected ? 'bold' : 'normal',
}));

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
    padding: theme.spacing(0.6, 2),
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
    '&::after': {
        content: isSelected ? '"\u2713"' : '""',
        position: 'absolute',
        color: 'white',
        fontSize: '0.8rem',
    }
}));

const VerticalDivider = styled(Divider)(({ theme }) => ({
    height: '100%',
    margin: theme.spacing(0, 1),
}));

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

const mockCertData = {
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

const CertificationDetail = () => {
    const { id } = useParams();
    const cert = mockCertData;
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(cert.likes);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [subjectiveAnswers, setSubjectiveAnswers] = useState({});

    const handleLike = () => {
        setIsLiked(true);
        setLikeCount(prevCount => prevCount + 1);
        setTimeout(() => setIsLiked(false), 500);
    };

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
            <h2 className="cert-title">자격증 문제 게시판</h2>

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
                                <TitleTypography variant="h4">{cert.title}</TitleTypography>
                            </TitleContainer>
                        </Grid>
                        <Grid item xs={4}>
                            <InfoContainerWrapper>
                                <InfoContainer>
                                    <InfoTypography variant="subtitle2">{cert.certificate}</InfoTypography>
                                    <InfoTypography variant="subtitle2">{cert.author}</InfoTypography>
                                    <InfoTypography variant="caption">{new Date(cert.createdAt).toLocaleString()}</InfoTypography>
                                </InfoContainer>
                            </InfoContainerWrapper>
                        </Grid>
                    </Grid>
                </HeaderContainer>

                <ContentContainer>
                    <QuestionSheetContainer>
                        <Typography variant="h6" gutterBottom></Typography>
                        {cert.questions.map((q, index) => (
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
                                            variant="standard"
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
                            {cert.questions.map((q, index) => (
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
                                    {index !== cert.questions.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </AnswerSheetContent>
                    </AnswerSheetContainer>
                </ContentContainer>
            </Container>
        </div>
    );
};

export default CertificationDetail;