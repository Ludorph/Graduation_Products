import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import './jokboliststyle.css';
import cartIcon from '../img/boardimg/cart-icon.png';
import privateIcon from '../img/boardimg/private-icon.png';
import { jokboFetch } from './JokboFetch';

// const initialJokbos = [
//     { id: 'notice1', title: '🚨 족보 게시판 이용 규칙 🚨', author: 'admin', createdAt: '2024-08-13T10:00:00', views: 1000, likes: 50, isNotice: true },
//     { id: 'notice2', title: '🚨 족보 구매 시 주의사항 🚨', author: 'admin', createdAt: '2024-08-12T09:00:00', views: 800, likes: 30, isNotice: true },
//     { id: 1, title: '정보처리기사 실기 문제', author: 'user1', createdAt: '2024-08-13T15:30:00', views: 150, likes: 10, summary: '정보처리기사 실기 문제의 핵심 내용을 정리한 족보입니다.' },
//     { id: 2, title: '리눅스마스터 2급 기출문제', author: 'user2', createdAt: '2024-08-12T11:20:00', views: 120, likes: 5, summary: '리눅스마스터 2급 기출문제를 모아놓은 족보입니다.' },
//     { id: 3, title: '네트워크관리사 핵심정리', author: 'user3', createdAt: '2024-08-11T09:45:00', views: 200, likes: 15, summary: '네트워크관리사 시험 핵심 내용을 정리한 족보입니다.' },
// ];

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


// 모달창 관련 함수들
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
      width: '36px',  // 이미지 크기
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


function JokboList() {
    const navigate = useNavigate();
    const jokbos = jokboFetch.useFetchAllJokbos();
    const [selectedJokbo, setSelectedJokbo] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    // useEffect(() => {
    //     const fetchJokbos = async () => {
    //         await new Promise(resolve => setTimeout(resolve, 500));
    //         setJokbos(initialJokbos);
    //     };
    //     fetchJokbos();
    // }, []);

    const handleAddToCart = (id) => {
        console.log(`족보 ID ${id}를 장바구니에 추가했습니다.`);
    };

    const handleRowClick = (params) => {
        if (!params.row.isNotice) {
            navigate(`/board/jokbo/${params.row.examdata_post_id}`);
        }
    };


    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const columns = [
        {
            field: 'examdata_post_id',
            headerName: '번호',
            width: 80,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return params.row.isNotice ? <span style={{ color: 'red' }}>공지</span> : params.value;
            }
        },
        { field: 'examdata_title', headerName: '제목', width: 300, flex: 1, headerAlign: 'center' },
        { field: 'user_id', headerName: '글쓴이', width: 130, headerAlign: 'center', align: 'center' },
        {
            field: 'examdata_cdate',
            headerName: '작성일',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => formatDate(params.value)
        },
        { field: 'examdata_views', headerName: '조회수', width: 100, headerAlign: 'center', align: 'center' },
        { field: 'examdata_likes', headerName: '추천', width: 80, headerAlign: 'center', align: 'center' },
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
            <h2 className="jokbo-list-title">족보 게시판</h2>
            <div className="jokbo-list-container">
                <div className="jokbo-list-grid">
                    <DataGrid
                        className="super-app-theme"
                        rows={jokbos}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        getRowId={(row) => row.examdata_post_id}
                        sortModel={[
                            { field: 'isNotice', sort: 'desc' },
                            { field: 'id', sort: 'desc' },
                        ]}
                        onRowClick={handleRowClick}
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
                <div className="jokbo-write-button">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/board/jokbo/write')}
                        style={{ backgroundColor: '#413839' }}
                    >
                        족보 등록
                    </Button>
                </div>
            </div>
            <StyledDialog open={openDialog} onClose={handleCloseDialog}>
                <StyledDialogTitle>
                    <img src={privateIcon} alt="Private" />
                    <span className="jokbo-title">{selectedJokbo?.title}</span>
                </StyledDialogTitle>
                <StyledDialogContent>
                    <p className="jokbo-detail">{selectedJokbo?.summary}</p>
                    <p className="jokbo-detail">이 족보를 열람하려면 포인트 결제가 필요합니다.</p>
                    <PriceText>가격: 1,000 포인트</PriceText>
                </StyledDialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>취소</Button>
                    <Button
                        onClick={() => {
                            handleAddToCart(selectedJokbo?.id);
                            handleCloseDialog();
                        }}
                        color="primary"
                    >
                        결제하기
                    </Button>
                </DialogActions>
            </StyledDialog>
        </div>
    );
}

export default JokboList;
