import React, { useState } from 'react';
import { Dialog, DialogContent, Paper } from '@mui/material';
import Draggable from 'react-draggable';
import { styled } from '@mui/material/styles';
import './pointset.css';

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: 0,
    },
    '& .MuiDialog-paper': {
        backgroundColor: '#ffffff',
        margin: 0,
        maxHeight: '100%',
        '&::-webkit-resizer': {
            display: 'none',
        },
        resize: 'none',
    },
    '& .MuiDialogContent-root::-webkit-scrollbar': {
        width: '0.4em',
    },
    '& .MuiDialogContent-root::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '& .MuiDialogContent-root::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.1)',
        outline: '1px solid slategrey',
    },
}));

function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

const PointSet = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [pointHistory, setPointHistory] = useState([
        { id: 1, description: '족보 구매', change: -3600, balance: 6400 },
        { id: 2, description: '퀴즈 참여', change: 1000, balance: 10000 },
        { id: 3, description: '출석 체크', change: 100, balance: 9000 },
        { id: 4, description: '족보 판매', change: 5000, balance: 8900 },
        { id: 5, description: '이벤트 참여', change: 2000, balance: 3900 },
    ]);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div className="point-management">
            <div className="point-header">포인트 관리</div>
            <div className="point-set-container">
                <div className="point-set-left">
                    <span className="point-item-text">포인트 내역</span>
                </div>
                <div className="point-set-right">
                    <div className="point-set-box">
                        <table className="point-history-table">
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>사용내역</th>
                                    <th>증감</th>
                                    <th>포인트</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pointHistory.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{pointHistory.length - index}</td>
                                        <td>{item.description}</td>
                                        <td className={item.change > 0 ? 'positive' : 'negative'}>
                                            {item.change > 0 ? '+' : ''}{item.change}
                                        </td>
                                        <td>{item.balance}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <StyledDialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="md"
                fullWidth
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <div id="draggable-dialog-title" style={{ cursor: 'move', padding: '10px', backgroundColor: '#ecc344' }}>
                    포인트 관리
                </div>
                <DialogContent>
                    {/* 다이얼로그 내용 */}
                </DialogContent>
            </StyledDialog>
        </div>
    );
};

export default PointSet;