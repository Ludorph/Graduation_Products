import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    Divider,
    Button
} from '@mui/material';
import { GoChevronRight } from "react-icons/go";
import { styled } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import './certificationdetailstyle.css'

const HeaderContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    padding: theme.spacing(0, 0),
    marginBottom: theme.spacing(2), // 문항들 사이 세로간격
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
    border: '1px solid #dcdbdc', // 문제 풀이영역 테두리
}));

const AnswerSheetContainer = styled(Box)(({ theme }) => ({
    flex: 1.1,
    border: '0px solid #849E8A',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '-17px' // 문제풀이 영역과 답안 표기란 사이의 간격을 삭제
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
    // '&:hover': {
    //     backgroundColor: theme.palette.action.hover,
    // },
}));

const OptionNumber = styled(Box)(({ theme, isSelected }) => ({
    fontFamily: "'NanumSquareNeoLight', sans-serif",
    width: '1.4rem',
    height: '1.4rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '1.2rem',
    // fontWeight: 'bold',
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

const Tag1 = styled(Box)(({ theme }) => ({
    backgroundColor: '#f0f0f0',
    borderRadius: '20px',
    padding: '5px 10px',
    marginRight: '10px',
    marginBottom: '5px',
    fontFamily: "'NanumSquareNeoBold', sans-serif",
    fontSize: '13px',
    display: 'inline-block'
}));

const Tag2 = styled(Box)(({ theme }) => ({
    backgroundColor: '#f0f0f0',
    borderRadius: '20px',
    padding: '5px 10px',
    marginRight: '10px',
    marginBottom: '5px',
    fontFamily: "'NanumSquareNeoBold', sans-serif",
    fontSize: '13.5px',
    display: 'inline-block'
}));

const mockCertData = {
    id: 1,
    examInfo: '2020년 2회',
    subjects: '1과목 소프트웨어설계',
    title: '정보처리기사 필기',
    author: 'user1',
    createdAt: '2024-08-13T15:30:00',
    views: 150,
    certificate: '정보처리기사',
    certId: 1,
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
            answers: [false, true, false, false]
        },
        {
            id: 2,
            type: '객관식',
            question: 'OSI 7계층 중 네트워크 계층의 주요 기능은?',
            options: [
                '데이터 전송',
                '라우팅',
                '세션 관리',
                '데이터 압축'
            ],
            answers: [false, true, false, false]
        },
        {
            id: 3,
            type: '객관식',
            question: 'OSI 7계층 중 네트워크 계층의 주요 기능은?',
            options: [
                '데이터 전송',
                '라우팅',
                '세션 관리',
                '데이터 압축'
            ],
            answers: [false, true, false, false]
        },
        {
            id: 4,
            type: '객관식',
            question: '다음 중 객체지향 프로그래밍의 특징이 아닌 것은?',
            options: ['캡슐화', '상속성', '순차적 실행', '다형성'],
            answers: [false, false, true, false]
        },
        {
            id: 5,
            type: '객관식',
            question: '다음 중 애자일 방법론의 특징은?',
            options: ['문서 중심', '반복적 개발', '빅뱅 통합', '폭포수 모델'],
            answers: [false, true, false, false]
        },
        {
            id: 6,
            type: '객관식',
            question: 'IP 주소 클래스 중 기본 네트워크 비트가 24비트인 것은?',
            options: ['A클래스', 'B클래스', 'C클래스', 'D클래스'],
            answers: [false, false, true, false]
        },
        {
            id: 7,
            type: '객관식',
            question: '다음 중 프로세스 스케줄링 알고리즘이 아닌 것은?',
            options: ['FCFS', 'SJF', 'DNS', 'Round Robin'],
            answers: [false, false, true, false]
        },
        {
            id: 8,
            type: '객관식',
            question: '다음 중 트랜잭션의 특성(ACID)이 아닌 것은?',
            options: ['원자성', '일관성', '독립성', '확장성'],
            answers: [false, false, false, true]
        },
        {
            id: 9,
            type: '객관식',
            question: 'HTTP 상태 코드 중 서버 오류를 나타내는 상태 코드는?',
            options: ['2xx', '3xx', '4xx', '5xx'],
            answers: [false, false, false, true]
        },
        {
            id: 10,
            type: '객관식',
            question: '다음 중 비밀키 암호화 방식은?',
            options: ['RSA', 'AES', 'ECC', 'DSA'],
            answers: [false, true, false, false]
        }
    ]
};

const CertificationDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const cert = mockCertData;
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(cert.likes);
    const [selectedAnswers, setSelectedAnswers] = useState({});

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

    return (
        <div>
            <Container maxWidth="md">
                <div className="cert-detail-header">
                    <span
                        onClick={() => navigate('/board/cert')}
                        className="board-title"
                        style={{ cursor: 'pointer' }}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} /> 문제은행 게시판
                    </span>
                    <Button
                        variant="contained"
                        onClick={() => navigate(`/certigallery/${cert.certId}`)}
                        sx={{
                            marginLeft: '460px',
                            borderRadius: '20px',
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                            backgroundColor: '#b8b7b1',
                            color: 'white',
                            fontFamily: "'NanumSquareNeoLight', sans-serif",
                            '&:hover': {
                                backgroundColor: '#849E8A'
                            }
                        }}
                    >
                        {cert.certificate} 자격증 보러가기
                        <Box sx={{ display: 'flex', marginLeft: '1px', marginTop: '1px' }}>
                            <GoChevronRight size={20} style={{ marginRight: '-14px' }} />
                            <GoChevronRight size={20} />
                        </Box>
                    </Button>
                </div>
                <HeaderContainer>
                    <Grid container alignItems="center">
                        <Grid item xs={4}>
                        </Grid>
                        <Grid item xs={4}>
                            <TitleContainer>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        gap: '8px',  // 태그 사이의 간격
                                        alignItems: 'center'
                                    }}>
                                        <Tag1>{cert.examInfo}</Tag1>
                                        <Tag2>{cert.subjects}</Tag2>
                                    </Box>
                                    <TitleTypography variant="h4">{cert.title}</TitleTypography>
                                </Box>
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
                                    <span style={{
                                        color: '#868656',
                                        fontWeight: 'bold',
                                        fontFamily: "'NanumSquareNeoBold', sans-serif",
                                        fontSize: '18px',
                                        marginRight: '2px'
                                    }}>
                                        {index + 1}.
                                    </span>
                                    <span style={{ marginLeft: '4px' }}>{q.question}</span>
                                </Typography>
                                <Box ml={2}>
                                    {q.options.map((option, i) => (
                                        <OptionItem
                                            key={i}
                                            isSelected={selectedAnswers[q.id] === i}
                                            onClick={() => handleQuestionOptionSelect(q.id, i)}
                                        >
                                            <OptionNumber isSelected={selectedAnswers[q.id] === i}>
                                                {['①', '②', '③', '④'][i]}
                                            </OptionNumber>
                                            <OptionText isSelected={selectedAnswers[q.id] === i}>
                                                {option}
                                            </OptionText>
                                        </OptionItem>
                                    ))}
                                </Box>
                            </QuestionItem>
                        ))}
                    </QuestionSheetContainer>

                    <AnswerSheetContainer
                        sx={{
                            position: 'sticky',
                            top: '20px',
                            backgroundColor: '#a2b59f',
                            height: 'fit-content', // 스크롤바 제거를 위한 수정
                            maxHeight: 'calc(100vh - 20px)', // 40px에서 20px로 수정하여 더 긴 길이 확보
                            overflowY: 'auto',
                            padding: '16px',
                            borderRadius: '0',
                            fontFamily: "'NanumSquareNeoLight', sans-serif",
                            '&::-webkit-scrollbar': {  // 스크롤바 숨기기
                                display: 'none'
                            },
                            '-ms-overflow-style': 'none',  // IE and Edge
                            'scrollbarWidth': 'none'  // Firefox
                        }}
                    >
                        <AnswerSheetTitle sx={{
                            color: 'white',
                            marginBottom: '10px',
                            fontFamily: "'NanumSquareNeoLight', sans-serif",
                            backgroundColor: '#a2b59f'
                        }}>
                            답안 표기란
                        </AnswerSheetTitle>
                        <AnswerSheetContent>
                            {cert.questions.map((q, index) => (
                                <Box
                                    key={q.id}
                                    sx={{
                                        marginBottom: '2px',
                                        display: 'flex',
                                        gap: '2px',
                                        height: '32px'  // 전체 높이를 32px로 통일
                                    }}
                                >
                                    {/* 문제 번호 박스 */}
                                    <Box
                                        sx={{
                                            backgroundColor: '#FDFEFE',
                                            padding: '0 12px',  // 패딩 수정
                                            minWidth: '45px',
                                            maxWidth: '45px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '100%'  // 부모 높이에 맞춤
                                        }}
                                    >
                                        <Typography sx={{
                                            fontFamily: "'NanumSquareNeoBold', sans-serif"
                                        }}>
                                            {index + 1}
                                        </Typography>
                                    </Box>

                                    {/* 답안 영역 */}
                                    <Box
                                        sx={{
                                            backgroundColor: '#FDFEFE',
                                            flex: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '0 12px',
                                            height: '100%'  // 부모 높이에 맞춤
                                        }}
                                    >
                                        <Box sx={{
                                            display: 'flex',
                                            gap: '12px',
                                            width: '90%',  // 전체 너비를 90%로 줄임
                                            justifyContent: 'center',  // 수평 가운데 정렬
                                            marginLeft: '-1px'  // 왼쪽 마진을 음수값으로 조정
                                        }}>
                                            {['①', '②', '③', '④'].map((option, i) => (
                                                <Box
                                                    key={i}
                                                    onClick={() => handleAnswerSelect(q.id, i)}
                                                    sx={{
                                                        width: '1.3rem',
                                                        height: '1.3rem',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        cursor: 'pointer',
                                                        fontSize: '1.2rem',
                                                        fontFamily: "'NanumSquareNeoLight', sans-serif",
                                                        color: selectedAnswers[q.id] === i ? 'transparent' : '#000',
                                                        backgroundColor: selectedAnswers[q.id] === i ? '#3a3e3e' : 'transparent',
                                                        borderRadius: '50%',
                                                        transition: 'background-color 0.3s ease, color 0.3s ease',
                                                        position: 'relative',
                                                        '&:hover': {
                                                            backgroundColor: selectedAnswers[q.id] === i ? '#3a3e3e' : '#f5f5f5',
                                                        },
                                                        '&::after': {
                                                            content: selectedAnswers[q.id] === i ? '"\u2713"' : '""',
                                                            position: 'absolute',
                                                            color: 'white',
                                                            fontSize: '0.7rem',
                                                            fontFamily: "'NanumSquareNeoLight', sans-serif"
                                                        }
                                                    }}
                                                >
                                                    {option}
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </AnswerSheetContent>
                    </AnswerSheetContainer>
                </ContentContainer>
            </Container>
        </div>
    );
};

export default CertificationDetail;