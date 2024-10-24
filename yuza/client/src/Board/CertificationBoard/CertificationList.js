import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import './certificationliststyle.css';
import CertificationSelector from './CertificationSelector';
import CertificationService from "./CertificationService";

const rawInitialCerts = [
    { 
        question_post_id: 'notice1', 
        question_title: '🚨 자격증 문제 게시판 이용 규칙 🚨', 
        user_id: 'admin', 
        question_date: '2024-08-13T10:00:00', 
        question_views: 1000, 
        question_likes: 50, 
        isNotice: true 
    },
    { 
        question_post_id: 'notice2', 
        question_title: '🚨 자격증 문제 게시판 활용 가이드 🚨', 
        user_id: 'admin', 
        question_date: '2024-08-12T09:00:00', 
        question_views: 800, 
        question_likes: 30, 
        isNotice: true 
    },
    {
        question_post_id: 1,
        question_title: '정보처리기사 실기 2024년 1회 기출문제',
        user_id: 'user1',
        question_date: '2024-08-13T15:30:00',
        question_views: 150,
        question_likes: 10,
        certType: '정보처리기사'
    },
    {
        question_post_id: 2,
        question_title: '리눅스마스터 2급 핵심문제 모음',
        user_id: 'user2',
        question_date: '2024-08-12T11:20:00',
        question_views: 120,
        question_likes: 5,
        certType: '리눅스마스터'
    },
    {
        question_post_id: 3,
        question_title: '네트워크관리사 실전 모의고사',
        user_id: 'user3',
        question_date: '2024-08-11T09:45:00',
        question_views: 200,
        question_likes: 15,
        certType: '네트워크관리사'
    },
    {
        question_post_id: 4,
        question_title: '정보보안기사 실기 기출 해설',
        user_id: 'user4',
        question_date: '2024-08-10T14:20:00',
        question_views: 180,
        question_likes: 20,
        certType: '정보보안기사'
    },
    {
        question_post_id: 5,
        question_title: '빅데이터분석기사 실전 문제은행',
        user_id: 'user5',
        question_date: '2024-08-09T16:15:00',
        question_views: 220,
        question_likes: 25,
        certType: '빅데이터분석기사'
    },
    {
        question_post_id: 6,
        question_title: '정보처리기사 실기 2023년 4회 기출문제',
        user_id: 'user6',
        question_date: '2024-08-08T13:30:00',
        question_views: 175,
        question_likes: 18,
        certType: '정보처리기사'
    },
    {
        question_post_id: 7,
        question_title: '리눅스마스터 1급 실전 모의고사',
        user_id: 'user7',
        question_date: '2024-08-07T10:20:00',
        question_views: 190,
        question_likes: 22,
        certType: '리눅스마스터'
    },
    {
        question_post_id: 8,
        question_title: '네트워크관리사 핵심이론 문제',
        user_id: 'user8',
        question_date: '2024-08-06T09:15:00',
        question_views: 165,
        question_likes: 12,
        certType: '네트워크관리사'
    },
    {
        question_post_id: 9,
        question_title: '정보보안기사 실기 핵심문제',
        user_id: 'user9',
        question_date: '2024-08-05T15:45:00',
        question_views: 210,
        question_likes: 28,
        certType: '정보보안기사'
    },
    {
        question_post_id: 10,
        question_title: '빅데이터분석기사 기출문제 해설',
        user_id: 'user10',
        question_date: '2024-08-04T11:30:00',
        question_views: 195,
        question_likes: 16,
        certType: '빅데이터분석기사'
    }
];

function processInitialCerts(certs) {
    const notices = certs.filter(cert => cert.isNotice);
    const regularCerts = certs.filter(cert => !cert.isNotice)
        .sort((a, b) => new Date(b.question_date) - new Date(a.question_date));  // createdAt -> question_date

    return [
        ...notices.map((notice, index) => ({
            ...notice,
            id: `notice-${index + 1}`,
        })),
        ...regularCerts.map((cert, index) => ({
            ...cert,
            id: regularCerts.length - index,
            originalId: regularCerts.length - index
        }))
    ];
}

const initialCerts = processInitialCerts(rawInitialCerts);

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    } else {
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    }
};

const ButtonContainer = styled('div')({
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: '20px',
    marginBottom: '20px',
});

const StyledButton = styled(Button)({
    backgroundColor: '#413839',
    color: 'white',
    '&:hover': {
        backgroundColor: '#2c2626',
    },
});

function CertificationList() {
    const navigate = useNavigate();
    const [certs, setCerts] = useState([]);
    const [selectedCertType, setSelectedCertType] = useState('내 학과 전체 자격증');
    const [selectedOtherCert, setSelectedOtherCert] = useState(null);
    const [myDepartmentCertifications, setMyDepartmentCertifications] = useState([
        '정보처리기사', '리눅스마스터', '네트워크관리사', '정보보안기사', '빅데이터분석기사'
    ]);
    const location = useLocation();

    useEffect(() => {
        const fetchCertification = async () => {
            try {
                // const data = await CertificationService.getAllCertification();
                // setCerts(data);
                setCerts(rawInitialCerts); // 더미데이터 사용(db연결시 삭제하고 위에 주석처리된거 쓰면 됨)
            } catch (error) {
                console.error('자격증 목록 조회 실패:', error);
            }
        };
        fetchCertification();
    }, []);

    const certTypes = ['내 학과 전체 자격증', ...myDepartmentCertifications];

    const handleRowClick = (params) => {
        if (!params.row.isNotice) {      { /* 공지사항이 아닌 경우에만 navigate 실행 */}
            navigate(`/board/cert/test/${params.row.question_post_id}`);
        }
    };

    const handleCertTypeSelect = (certType, otherCert = null) => {
        setSelectedCertType(certType);
        setSelectedOtherCert(otherCert);
    };

    const [paginationModel, setPaginationModel] = useState({
        pageSize: 15,
        page: 0,
    });

    const [sortModel, setSortModel] = useState([
        { field: 'isNotice', sort: 'desc' },
        { field: 'id', sort: 'asc' },
    ]);

    const filteredCerts = selectedCertType === '내 학과 전체 자격증'
        ? certs
        : selectedCertType === '기타 자격증'
            ? certs.filter(cert => cert.certType === selectedOtherCert || cert.isNotice)
            : certs.filter(cert => cert.certType === selectedCertType || cert.isNotice);

    const columns = [
        {
            field: 'question_post_id',
            headerName: '번호',
            width: 80,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                if (params.row.isNotice) {
                    return <span style={{ color: 'red' }}>공지</span>;
                }
                return params.value;
            },
            resizable: false
        },
        { field: 'question_title', headerName: '제목', width: 300, flex: 1, headerAlign: 'center', resizable: false },
        { field: 'user_id', headerName: '글쓴이', width: 130, headerAlign: 'center', align: 'center', resizable: false },
        {
            field: 'question_date',
            headerName: '작성일',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => formatDate(params.value),
            resizable: false
        },
        { field: 'question_views', headerName: '조회수', width: 100, headerAlign: 'center', align: 'center', resizable: false },
        { field: 'question_likes', headerName: '추천', width: 80, headerAlign: 'center', align: 'center', resizable: false }
    ];

    useEffect(() => {
        if (location.state && location.state.selectedCertType) {
            const certType = location.state.selectedCertType;
            if (myDepartmentCertifications.includes(certType)) {
                setSelectedCertType(certType);
            } else {
                setSelectedCertType('기타 자격증');
                setSelectedOtherCert(certType);
            }
        }
    }, [location]);

    return (
        <div>
            <h2 className="cert-list-title">자격증 문제 게시판</h2>
            <div className="cert-list-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <CertificationSelector
                    options={certTypes}
                    selectedOption={selectedCertType}
                    onSelect={(certType, otherCert) => handleCertTypeSelect(certType, otherCert)}
                    selectedOtherCert={selectedOtherCert}
                />
                <div className="cert-list-grid" style={{ height: 891, width: '100%' }}>
                    <DataGrid
                        rows={filteredCerts}
                        columns={columns}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        pageSizeOptions={[10]}
                        sortModel={sortModel}
                        onSortModelChange={setSortModel}
                        disableRowSelectionOnClick
                        onRowClick={handleRowClick}
                        getRowId={(row) => row.question_post_id}
                        initialState={{
                            sorting: {
                                sortModel: [
                                    { field: 'isNotice', sort: 'desc' },
                                    { field: 'id', sort: 'desc' },
                                ],
                            },
                        }}
                        sx={{
                            '& .MuiDataGrid-cell:focus': {
                                outline: 'none',
                            },
                            '& .MuiDataGrid-row:hover': {
                                backgroundColor: '#f5f5f5',
                            },
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#f0f0f0',
                            },
                            '& .MuiDataGrid-columnHeaderTitle': {
                                fontFamily: 'NanumSquareNeoBold, sans-serif',
                                fontWeight: 'bold',
                                textAlign: 'center',
                            },
                            '& .MuiDataGrid-cell': {
                                fontFamily: 'NanumSquareNeoLight, sans-serif',
                            },
                        }}
                    />
                </div>
                <ButtonContainer>
                    <StyledButton
                        variant="contained"
                        onClick={() => navigate('/board/cert/write')}
                    >
                        문제 등록
                    </StyledButton>
                </ButtonContainer>
            </div>
        </div>
    );
}

export default CertificationList;