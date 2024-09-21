import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import './freeliststyle.css';

const initialPosts = [
    { id: 'notice1', title: '🚨 자유게시판 이용 규칙 🚨', author: 'admin', createdAt: '2024-08-13T10:00:00', views: 1000, likes: 50, isNotice: true },
    { id: 'notice2', title: '🚨 게시글 작성 시 주의사항 🚨', author: 'admin', createdAt: '2024-08-12T09:00:00', views: 800, likes: 30, isNotice: true },
    { id: 1, title: '오늘 점심 뭐 먹을까요?', author: 'user1', createdAt: '2024-08-13T15:30:00', views: 150, likes: 10 },
    { id: 2, title: '주말에 볼만한 영화 추천해주세요', author: 'user2', createdAt: '2024-08-12T11:20:00', views: 120, likes: 5 },
    { id: 3, title: '운동 시작했습니다!', author: 'user3', createdAt: '2024-08-11T09:45:00', views: 200, likes: 15 },
];

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
});

const StyledDialogContent = styled(DialogContent)({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
});

function FreeList() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            await new Promise(resolve => setTimeout(resolve, 500));
            setPosts(initialPosts);
        };
        fetchPosts();
    }, []);

    const handleRowClick = (params) => {
        if (!params.row.isNotice) {
            navigate(`/board/free/${params.row.id}`);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const columns = [
        {
            field: 'id',
            headerName: '번호',
            width: 80,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return params.row.isNotice ? <span style={{ color: 'red' }}>공지</span> : params.value;
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
    ];

    return (
        <div>
            <h2 className="free-list-title">자유 게시판</h2>
            <div className="free-list-container">
                <div className="free-list-grid">
                    <DataGrid
                        className="super-app-theme"
                        rows={posts}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
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
                <div className="free-write-button">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/board/free/write')}
                        style={{ backgroundColor: '#413839' }}
                    >
                        글쓰기
                    </Button>
                </div>
            </div>
            <StyledDialog open={openDialog} onClose={handleCloseDialog}>
                <StyledDialogTitle>
                    <span className="post-title">{selectedPost?.title}</span>
                </StyledDialogTitle>
                <StyledDialogContent>
                    <p className="post-detail">{selectedPost?.content}</p>
                </StyledDialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>닫기</Button>
                </DialogActions>
            </StyledDialog>
        </div>
    );
}

export default FreeList;