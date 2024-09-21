import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import './certificationliststyle.css';
import cartIcon from '../../img/boardimg/cart-icon.png';
import privateIcon from '../../img/boardimg/private-icon.png';
import CertificationSelector from './CertificationSelector';

// const initialCerts = [
//     { id: 'notice1', title: '🚨 자격증 문제 게시판 이용 규칙 🚨', author: 'admin', createdAt: '2024-08-13T10:00:00', views: 1000, likes: 50, isNotice: true },
//     { id: 'notice2', title: '🚨 자격증 문제 구매 시 주의사항 🚨', author: 'admin', createdAt: '2024-08-12T09:00:00', views: 800, likes: 30, isNotice: true },
//     { id: 1, title: '정보처리기사 실기 문제', author: 'user1', createdAt: '2024-08-13T15:30:00', views: 150, likes: 10, summary: '정보처리기사 실기 문제의 핵심 내용을 정리한 자료입니다.', certType: '정보처리기사' },
//     { id: 2, title: '리눅스마스터 2급 기출문제', author: 'user2', createdAt: '2024-08-12T11:20:00', views: 120, likes: 5, summary: '리눅스마스터 2급 기출문제를 모아놓은 자료입니다.', certType: '리눅스마스터' },
//     { id: 3, title: '네트워크관리사 핵심정리', author: 'user3', createdAt: '2024-08-11T09:45:00', views: 200, likes: 15, summary: '네트워크관리사 시험 핵심 내용을 정리한 자료입니다.', certType: '네트워크관리사' },
//     { id: 4, title: '정보보안기사 문제 모음', author: 'user4', createdAt: '2024-08-10T14:20:00', views: 180, likes: 20, summary: '정보보안기사 시험 문제를 모아놓은 자료입니다.', certType: '정보보안기사' },
//     { id: 5, title: '빅데이터분석기사 실전 문제', author: 'user5', createdAt: '2024-08-09T16:15:00', views: 220, likes: 25, summary: '빅데이터분석기사 실전 문제를 정리한 자료입니다.', certType: '빅데이터분석기사' },
//     // ... 추가 게시글
// ];

// 임시로 결제된 게시글 ID 목록
const purchasedCertIds = [1, 3, 5, 7, 9];

const rawInitialCerts = [
    { id: 'notice1', title: '🚨 자격증 문제 게시판 이용 규칙 🚨', author: 'admin', createdAt: '2024-08-13T10:00:00', views: 1000, likes: 50, isNotice: true },
    { id: 'notice2', title: '🚨 자격증 문제 구매 시 주의사항 🚨', author: 'admin', createdAt: '2024-08-12T09:00:00', views: 800, likes: 30, isNotice: true },
    { title: '정보처리기사 실기 문제', author: 'user1', createdAt: '2024-08-13T15:30:00', views: 150, likes: 10, summary: '정보처리기사 실기 문제의 핵심 내용을 정리한 자료입니다.', certType: '정보처리기사' },
    { title: '리눅스마스터 2급 기출문제', author: 'user2', createdAt: '2024-08-12T11:20:00', views: 120, likes: 5, summary: '리눅스마스터 2급 기출문제를 모아놓은 자료입니다.', certType: '리눅스마스터' },
    { title: '네트워크관리사 핵심정리', author: 'user3', createdAt: '2024-08-15T09:45:00', views: 200, likes: 15, summary: '네트워크관리사 시험 핵심 내용을 정리한 자료입니다.', certType: '네트워크관리사' },
    { title: '정보보안기사 문제 모음', author: 'user4', createdAt: '2024-08-16T14:20:00', views: 180, likes: 20, summary: '정보보안기사 시험 문제를 모아놓은 자료입니다.', certType: '정보보안기사' },
    { title: '빅데이터분석기사 실전 문제', author: 'user5', createdAt: '2024-08-12T16:15:00', views: 220, likes: 25, summary: '빅데이터분석기사 실전 문제를 정리한 자료입니다.', certType: '빅데이터분석기사' },
    { title: '빅데이터분석기사 실전 문제', author: 'user5', createdAt: '2024-08-09T16:15:00', views: 220, likes: 25, summary: '빅데이터분석기사 실전 문제를 정리한 자료입니다.', certType: '빅데이터분석기사' },
    { title: '리눅스마스터 2급 기출문제', author: 'user2', createdAt: '2024-08-11T11:20:00', views: 120, likes: 5, summary: '리눅스마스터 2급 기출문제를 모아놓은 자료입니다.', certType: '리눅스마스터' },
    { title: '네트워크관리사 핵심정리', author: 'user3', createdAt: '2024-08-11T09:45:00', views: 200, likes: 15, summary: '네트워크관리사 시험 핵심 내용을 정리한 자료입니다.', certType: '네트워크관리사' },
    { title: '정보보안기사 문제 모음', author: 'user4', createdAt: '2024-08-10T14:20:00', views: 180, likes: 20, summary: '정보보안기사 시험 문제를 모아놓은 자료입니다.', certType: '정보보안기사' },
    { title: '빅데이터분석기사 실전 문제', author: 'user5', createdAt: '2024-08-09T16:15:00', views: 220, likes: 25, summary: '빅데이터분석기사 실전 문제를 정리한 자료입니다.', certType: '빅데이터분석기사' },
    { title: '빅데이터분석기사 실전 문제', author: 'user5', createdAt: '2024-08-09T16:15:00', views: 220, likes: 25, summary: '빅데이터분석기사 실전 문제를 정리한 자료입니다.', certType: '빅데이터분석기사' },
    { title: '네트워크관리사 핵심정리', author: 'user3', createdAt: '2024-08-14T09:45:00', views: 200, likes: 15, summary: '네트워크관리사 시험 핵심 내용을 정리한 자료입니다.', certType: '네트워크관리사' },
    { title: '정보보안기사 문제 모음', author: 'user4', createdAt: '2024-08-10T14:20:00', views: 180, likes: 20, summary: '정보보안기사 시험 문제를 모아놓은 자료입니다.', certType: '정보보안기사' },
    { title: '네트워크관리사 핵심정리', author: 'user3', createdAt: '2024-08-11T09:45:00', views: 200, likes: 15, summary: '네트워크관리사 시험 핵심 내용을 정리한 자료입니다.', certType: '네트워크관리사' },
    { title: '정보보안기사 문제 모음', author: 'user4', createdAt: '2024-08-10T14:20:00', views: 180, likes: 20, summary: '정보보안기사 시험 문제를 모아놓은 자료입니다.', certType: '정보보안기사' },
    { title: '조경기사 테스트', author: 'user4', createdAt: '2024-08-15T14:20:00', views: 180, likes: 20, summary: '정보보안기사 시험 문제를 모아놓은 자료입니다.', certType: '조경기사' },

];


function processInitialCerts(certs) {
    const notices = certs.filter(cert => cert.isNotice);
    const regularCerts = certs.filter(cert => !cert.isNotice)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return [
        ...notices.map((notice, index) => ({
            ...notice,
            id: `notice-${index + 1}`,  // 공지사항에 대한 고유 id 생성
        })),
        ...regularCerts.map((cert, index) => ({
            ...cert,
            id: regularCerts.length - index,  // id를 1부터 시작하는 오름차순으로 할당
            originalId: regularCerts.length - index  // 원래의 ID를 originalId로 저장
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

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        padding: theme.spacing(2),
    },
}));

const StyledDialogTitle = styled(DialogTitle)({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '& img': {
        width: '36px',
        height: '36px',
    },
});

const StyledDialogContent = styled(DialogContent)({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
});

const PriceText = styled('p')({
    color: 'red',
    fontWeight: 'bold',
    fontSize: '1.1rem'
});

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
    const [selectedCert, setSelectedCert] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCertType, setSelectedCertType] = useState('내 학과 전체 자격증');
    const [selectedOtherCert, setSelectedOtherCert] = useState(null);
    const [myDepartmentCertifications, setMyDepartmentCertifications] = useState([
        '정보처리기사', '리눅스마스터', '네트워크관리사', '정보보안기사', '빅데이터분석기사'
    ]);
    const [purchasedCerts, setPurchasedCerts] = useState([]);

    useEffect(() => {
        const fetchCerts = async () => {
            await new Promise(resolve => setTimeout(resolve, 500));
            const certsWithPurchaseStatus = initialCerts.map(cert => ({
                ...cert,
                isPurchased: purchasedCertIds.includes(cert.id)
            }));
            setCerts(certsWithPurchaseStatus);
        };
        fetchCerts();
    }, []);

    const certTypes = ['내 학과 전체 자격증', ...myDepartmentCertifications];

    const handleAddToCart = (id) => {
        console.log(`자격증 문제 ID ${id}를 장바구니에 추가했습니다.`);
        handleCloseDialog();
    };

    // const handleRowClick = (params) => {
    //     if (!params.row.isNotice) { /* 공지사항이 아닌 경우에만 함수(Dialog를 열도록) 실행 */
    //         setSelectedCert(params.row); /* 클릭한 행의 데이터를 selectedCert로 설정 */
    //         setOpenDialog(true);
    //     }
    // };

    const handleRowClick = (params) => {
        if (!params.row.isNotice) {
            if (params.row.isPurchased) {
                // 구매한 게시글인 경우 내용 페이지로 이동
                navigate(`/board/cert/${params.row.id}`);
            } else {
                // 구매하지 않은 게시글인 경우 결제 다이얼로그 표시
                setSelectedCert(params.row);
                setOpenDialog(true);
            }
        }
    };

    const handlePurchase = (certId) => {
        console.log(`자격증 문제 ID ${certId}를 구매했습니다.`);
        setCerts(prevCerts => prevCerts.map(cert =>
            cert.id === certId ? { ...cert, isPurchased: true } : cert
        ));
        handleCloseDialog();
        navigate(`/board/cert/${certId}`);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedCert(null); /* Dialog를 닫을 때 selectedCert를 null로 리셋 */
    };

    const handleCertTypeSelect = (certType, otherCert = null) => {
        setSelectedCertType(certType);
        setSelectedOtherCert(otherCert);
    };


    const [paginationModel, setPaginationModel] = useState({
        pageSize: 15, // 한 페이지에 15 게시글 표시
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
            field: 'originalId',
            headerName: '번호',
            width: 80,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                if (params.row.isNotice) {
                    return <span style={{ color: 'red' }}>공지</span>;
                }
                return params.value;
            }
        },
        { field: 'title', headerName: '제목', width: 300, flex: 1, headerAlign: 'center' },
        { field: 'author', headerName: '글쓴이', width: 130, headerAlign: 'center', align: 'center' },
        {
            field: 'createdAt',
            headerName: '작성일',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => formatDate(params.value)
        },
        { field: 'views', headerName: '조회수', width: 100, headerAlign: 'center', align: 'center' },
        { field: 'likes', headerName: '추천', width: 80, headerAlign: 'center', align: 'center' },
        {
            field: 'addToCart',
            headerName: '장바구니',
            width: 100,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <IconButton onClick={(e) => { e.stopPropagation(); handleAddToCart(params.row.id); }}>
                    <img src={cartIcon} alt="장바구니" style={{ width: 24, height: 24 }} />
                </IconButton>
            ),
        },
    ];

    return (
        <div>
            <h2 className="cert-list-title">자격증 문제 게시판</h2>
            <div className="cert-list-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <CertificationSelector
                    options={certTypes}
                    selectedOption={selectedCertType}
                    onSelect={(certType, otherCert) => handleCertTypeSelect(certType, otherCert)}
                />
                <div className="cert-list-grid" style={{ height: 891, width: '100%' }}>
                {/* cert-list-grid를 조절해서 게시판 크기 조절  */}
                    <DataGrid
                        rows={filteredCerts}
                        columns={columns}
                        getRowId={(row) => row.id}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        pageSizeOptions={[10]}
                        sortModel={sortModel}
                        onSortModelChange={setSortModel}
                        disableRowSelectionOnClick
                        onRowClick={handleRowClick}
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
            <StyledDialog open={openDialog} onClose={handleCloseDialog}>
                <StyledDialogTitle>
                    <img src={privateIcon} alt="Private" />
                    <span className="cert-title">{selectedCert?.title}</span>
                </StyledDialogTitle>
                <StyledDialogContent>
                    <p className="cert-detail">{selectedCert?.summary}</p>
                    <p className="cert-detail">이 자격증 문제를 열람하려면 포인트 결제가 필요합니다.</p>
                    <PriceText>가격: 1,000 포인트</PriceText>
                </StyledDialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>취소</Button>
                    <Button
                        onClick={() => handlePurchase(selectedCert?.id)}
                        color="primary"
                    >
                        결제하기
                    </Button>
                </DialogActions>
            </StyledDialog>
        </div>
    );
}

export default CertificationList;