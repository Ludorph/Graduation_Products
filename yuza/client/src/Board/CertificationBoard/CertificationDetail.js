import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CertificationService from "./CertificationService";
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
    // const cert = mockCertData;
    const [cert, setCert] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [isLiked, setIsLiked] = useState(false);
    // const [likeCount, setLikeCount] = useState(cert.likes);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [subjectiveAnswers, setSubjectiveAnswers] = useState({});

    useEffect(() => {
        const fetchCertification = async () => {
            try {
                const data = await CertificationService.getAllCertificationDetails(id);
                if (data) {
                    const structuredData = {
                        certificate_id: data[0].certificate_id,
                        certificate_name: data[0].certificate_name,
                        question_post_id: data[0].question_post_id,
                        user_id: data[0].user_id,
                        question_title: data[0].question_title,
                        question_views: data[0].question_views,
                        question_likes: data[0].question_likes,
                        question_date: data[0].question_date,
                        questions: data.reduce((acc, curr) => {
                            if (!acc[curr.question_id]) {
                                acc[curr.question_id] = {
                                    id: curr.question_id,
                                    content: curr.question_content,
                                    explanation: curr.question_explanation,
                                    tag: curr.question_tag,
                                    options: []
                                };
                            }
                            if (curr.options_id) {
                                acc[curr.question_id].options.push({
                                    id: curr.options_id,
                                    num: curr.options_num,
                                    content: curr.options_content,
                                    is_correct: curr.is_correct
                                });
                            }
                            return acc;
                        }, {})
                    };
                    setCert(structuredData);
                } else {
                    setError('자격증 정보를 찾을 수 없습니다.');
                }
            } catch (err) {
                console.error('Error fetching certification:', err);
                setError('자격증 데이터를 가져오는 데 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchCertification();
    }, [id]);

    // const handleLike = () => {
    //     setIsLiked(true);
    //     setLikeCount(prevCount => prevCount + 1);
    //     setTimeout(() => setIsLiked(false), 500);
    // };

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

    if (isLoading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;
    if (!cert) return <div>자격증 정보를 찾을 수 없습니다.</div>;

    return (
        <Container>
            <HeaderContainer>
                <TitleContainer>
                    <TitleTypography>{cert.question_title}</TitleTypography>
                </TitleContainer>
                <InfoContainerWrapper>
                    <InfoContainer>
                        <InfoTypography>작성자: {cert.user_id}</InfoTypography>
                        <InfoTypography>작성일: {new Date(cert.question_date).toLocaleDateString()}</InfoTypography>
                        <InfoTypography>조회수: {cert.question_views}</InfoTypography>
                    </InfoContainer>
                </InfoContainerWrapper>
            </HeaderContainer>

            {/*<LikeButtonContainer>*/}
            {/*    <LikeButton onClick={handleLike} isLiked={isLiked}>*/}
            {/*        <FontAwesomeIcon icon={faThumbsUp} />*/}
            {/*    </LikeButton>*/}
            {/*    <LikeCount>{likeCount}</LikeCount>*/}
            {/*</LikeButtonContainer>*/}

            <ContentContainer>
                <QuestionSheetContainer>
                    {Object.values(cert.questions).map((question, index) => (
                        <QuestionItem key={question.id}>
                            <Typography variant="h6">{index + 1}</Typography>
                            <Typography>{question.content}</Typography>
                            {question.options.map((option) => (
                                <OptionItem key={option.id}>
                                    <OptionNumber>{option.num}</OptionNumber>
                                    <OptionText>{option.content}</OptionText>
                                </OptionItem>
                            ))}
                            {question.explanation && (
                                <Typography variant="body2" style={{marginTop: '10px'}}>
                                    해설: {question.explanation}
                                </Typography>
                            )}
                        </QuestionItem>
                    ))}
                </QuestionSheetContainer>

                <AnswerSheetContainer>
                    <AnswerSheetTitle>답안지</AnswerSheetTitle>
                    <AnswerSheetContent>
                        {Object.values(cert.questions).map((question, index) => (
                            <AnswerItem key={question.id}>
                                <QuestionNumber>{index + 1}.</QuestionNumber>
                                <AnswerOptions>
                                    {question.options.map((option) => (
                                        <AnswerOption
                                            key={option.id}
                                            isSelected={selectedAnswers[question.id] === option.num}
                                            onClick={() => handleAnswerSelect(question.id, option.num)}
                                        >
                                            {option.num}
                                        </AnswerOption>
                                    ))}
                                </AnswerOptions>
                            </AnswerItem>
                        ))}
                    </AnswerSheetContent>
                </AnswerSheetContainer>
            </ContentContainer>
        </Container>
    );
};

export default CertificationDetail;