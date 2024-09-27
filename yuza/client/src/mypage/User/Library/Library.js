import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { CiLogin, CiEdit } from "react-icons/ci";
import './librarystyle.css';

const PeriodSelectorContainer = styled.div`
  --gap: 1.9px;
  background-color: #d9d9d9;
  border-radius: 25px;
  padding: var(--gap);
  display: inline-flex;
  position: relative;
  overflow: visible;
  margin-left: 10px;
  font-size: 12px;
`;

const Option = styled.div`
  font-family: 'NanumSquareNeoBold', sans-serif !important;
  height: 30px;
  padding: 0 19px;
  cursor: pointer;
  position: relative;
  z-index: 2;
  transition: color 0.3s ease;
  color: ${props => props.isSelected ? '#333333' : '#767676'};
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Slider = styled.div`
  position: absolute;
  top: var(--gap);
  left: calc(var(--gap) - 2.2px);  // 2.2px 왼쪽으로 이동
  height: calc(100% - calc(var(--gap) * 2));
  border-radius: 24px;
  transition: 0.3s ease;
  background-color: #ffffff;
  z-index: 1;
`;

const DateDisplay = styled.div`
  margin-left: 20px;
  font-family: 'NanumSquareNeoBold', sans-serif;
  display: flex;
  align-items: center;
  font-size: 13px;
`;

/* 바로가기 아이콘 */
const IconButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  color: #4CAF50;
  transition: color 0.3s ease;

  &:hover {
    color: #45a049;
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 3px;
`;

const Library = () => {

    const [sliderStyle, setSliderStyle] = useState({});
    const [dateRange, setDateRange] = useState('');
    const periods = ['오늘', '7일', '3개월', '전체'];

    // 구매한 족보 관련 상태함수 => 초기값을 '전체'로 표시해서 데이터가 아예 출력되지 않는 현상 방지
    const [selectedPeriod, setSelectedPeriod] = useState('전체');

    // 작성한 족보 관련 상태
    const [writtenSelectedPeriod, setWrittenSelectedPeriod] = useState('전체');
    const [writtenSliderStyle, setWrittenSliderStyle] = useState({});
    const [writtenDateRange, setWrittenDateRange] = useState('');

    // 구매한 족보의 족보 데이터(db 연결시 컬럼명 똑같이 쓰면 됨) 
    const [exams, setExams] = useState([
        { id: 1, name: "2023년 1학기 중간고사 족보", purchaseDate: "2023-09-15", price: 5000 },
        { id: 2, name: "2022년 2학기 기말고사 족보", purchaseDate: "2023-09-10", price: 4500 },
        { id: 3, name: "2023년 여름학기 족보", purchaseDate: "2023-08-20", price: 3000 },
        { id: 4, name: "2022년 1학기 중간고사 족보", purchaseDate: "2023-07-05", price: 4000 },
        { id: 5, name: "2021년 2학기 기말고사 족보", purchaseDate: "2023-06-30", price: 3500 },
    ]);

    // 작성한 족보
    const [writtenExams, setWrittenExams] = useState([
        { id: 1, name: "2023년 2학기 중간고사 족보", createDate: "2023-09-15", modifyDate: "2023-09-21", points: 1000, salesCount: 6 },
        { id: 2, name: "2023년 1학기 기말고사 족보", createDate: "2023-06-10", modifyDate: null, points: 1500, salesCount: 1 },
        { id: 3, name: "2022년 여름학기 족보", createDate: "2022-08-20", modifyDate: "2023-08-15", points: 800, salesCount: 3 },
    ]);

    // 날짜에 따라 필터링된 족보 목록(각각 구매, 작성 족보)
    const [filteredExams, setFilteredExams] = useState(exams);
    const [filteredWrittenExams, setFilteredWrittenExams] = useState(writtenExams);

    const updateSliderStyle = (index) => {
        const option = document.getElementById(`period-option-${index}`);
        if (option) {
            setSliderStyle({
                width: `${option.offsetWidth}px`,
                transform: `translateX(${option.offsetLeft}px)`
            });
        }
    };

    useEffect(() => {
        const index = periods.indexOf(selectedPeriod);
        updateSliderStyle(index);
        updateDateRange(selectedPeriod);
        filterExams(selectedPeriod);
    }, [selectedPeriod]);

    useEffect(() => {
        filterExams(selectedPeriod);
    }, [selectedPeriod, exams]);

    const handlePeriodClick = (period) => {
        setSelectedPeriod(period);
    };

    const updateDateRange = (period) => {
        const today = new Date();
        let startDate = new Date(today);

        switch (period) {
            case '오늘':
                break;
            case '7일':
                startDate.setDate(today.getDate() - 7);
                break;
            case '3개월':
                startDate.setMonth(today.getMonth() - 3);
                break;
            case '전체':
                setDateRange('전체 기간');
                return;
            default:
                break;
        }

        const formatDate = (date) => {
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        };

        setDateRange(`${formatDate(startDate)} ~ ${formatDate(today)}`);
    };

    const filterExams = (period) => {
        const today = new Date();
        let startDate = new Date(today);

        switch (period) {
            case '7일':
                startDate.setDate(today.getDate() - 7);
                break;
            case '3개월':
                startDate.setMonth(today.getMonth() - 3);
                break;
            case '전체':
                setFilteredExams(exams);
                return;
            case '오늘':
                startDate = new Date(today.setHours(0, 0, 0, 0));
                break;
            default:
                setFilteredExams(exams);
                return;
        }

        const filtered = exams.filter(exam => {
            const examDate = new Date(exam.purchaseDate);
            return examDate >= startDate && examDate <= today;
        });
        setFilteredExams(filtered);
    };

    // 작성한 족보 관련
    const updateWrittenSliderStyle = (index) => {
        const option = document.getElementById(`written-period-option-${index}`);
        if (option) {
            setWrittenSliderStyle({
                width: `${option.offsetWidth}px`,
                transform: `translateX(${option.offsetLeft}px)`
            });
        }
    };

    useEffect(() => {
        const index = periods.indexOf(writtenSelectedPeriod);
        updateWrittenSliderStyle(index);
        updateWrittenDateRange(writtenSelectedPeriod);
        filterWrittenExams(writtenSelectedPeriod);
    }, [writtenSelectedPeriod]);

    const handleWrittenPeriodClick = (period) => {
        setWrittenSelectedPeriod(period);
    };

    const updateWrittenDateRange = (period) => {
        const today = new Date();
        let startDate = new Date(today);

        switch (period) {
            case '오늘':
                break;
            case '7일':
                startDate.setDate(today.getDate() - 7);
                break;
            case '3개월':
                startDate.setMonth(today.getMonth() - 3);
                break;
            case '전체':
                setWrittenDateRange('전체 기간');
                return;
            default:
                break;
        }

        const formatDate = (date) => {
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        };

        setWrittenDateRange(`${formatDate(startDate)} ~ ${formatDate(today)}`);
    };

    const filterWrittenExams = (period) => {
        const today = new Date();
        let startDate = new Date(today);

        switch (period) {
            case '7일':
                startDate.setDate(today.getDate() - 7);
                break;
            case '3개월':
                startDate.setMonth(today.getMonth() - 3);
                break;
            case '전체':
                setFilteredWrittenExams(writtenExams);
                return;
            case '오늘':
                startDate = new Date(today.setHours(0, 0, 0, 0));
                break;
            default:
                setFilteredWrittenExams(writtenExams);
                return;
        }

        const filtered = writtenExams.filter(exam => {
            const examDate = new Date(exam.createDate);
            return examDate >= startDate && examDate <= today;
        });
        setFilteredWrittenExams(filtered);
    };

    return (
        <div className="library-management">
            <div className="library-header">라이브러리</div>
            <div className="library-set-container">
                <div className="library-set-left">
                    <span className="library-item-text">구매한 족보</span>
                </div>
                <div className="library-set-right">
                    <div className="library-set-box">
                        <div className="library-period-selector">
                            <span className="purchase-date">구매일자</span>
                            <div className="separator"></div>
                            <div className="period-selector-wrapper">
                                <PeriodSelectorContainer>
                                    <Slider style={sliderStyle} />
                                    {periods.map((period, index) => (
                                        <Option
                                            key={period}
                                            id={`period-option-${index}`}
                                            isSelected={selectedPeriod === period}
                                            onClick={() => handlePeriodClick(period)}
                                        >
                                            {period}
                                        </Option>
                                    ))}
                                </PeriodSelectorContainer>
                                <DateDisplay>{dateRange}</DateDisplay>
                            </div>
                        </div>
                    </div>
                    <div className="library-exam-list-box">
                        <table className="library-exam-list">
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>족보이름</th>
                                    <th>구매일자</th>
                                    <th>바로가기</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredExams.map((exam, index) => (
                                    <tr key={exam.id}>
                                        <td>{filteredExams.length - index}</td>
                                        <td>{exam.name}</td>
                                        <td>
                                            {exam.purchaseDate}
                                            <br />
                                            <span className="exam-price">{exam.price.toLocaleString()}p</span>
                                        </td>
                                        <td>
                                            <IconButton>
                                                <CiLogin size={24} />
                                            </IconButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="library-set-container">
                <div className="library-set-left">
                    <span className="library-item-text">작성한 족보</span>
                </div>
                <div className="library-set-right">
                    <div className="library-set-box">
                        <div className="library-period-selector">
                            <span className="purchase-date">작성일자</span>
                            <div className="separator"></div>
                            <div className="period-selector-wrapper">
                                <PeriodSelectorContainer>
                                    <Slider style={writtenSliderStyle} />
                                    {periods.map((period, index) => (
                                        <Option
                                            key={period}
                                            id={`written-period-option-${index}`}
                                            isSelected={writtenSelectedPeriod === period}
                                            onClick={() => handleWrittenPeriodClick(period)}
                                        >
                                            {period}
                                        </Option>
                                    ))}
                                </PeriodSelectorContainer>
                                <DateDisplay>{writtenDateRange}</DateDisplay>
                            </div>
                        </div>
                    </div>
                    <div className="library-exam-list-box written-exams">
                        <table className="library-exam-list written-exams">
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>족보이름</th>
                                    <th>작성일자</th>
                                    <th>판매량</th>
                                    <th><span>바로가기/수정하기</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredWrittenExams.map((exam, index) => (
                                    <tr key={exam.id}>
                                        <td>{filteredWrittenExams.length - index}</td>
                                        <td>{exam.name}</td>
                                        <td>
                                            {exam.createDate}
                                            <br />
                                            <span className="exam-points">{exam.points.toLocaleString()}p</span>
                                            {exam.modifyDate && <br />}
                                            {exam.modifyDate && <span className="modify-date">({exam.modifyDate})</span>}
                                        </td>
                                        <td>{exam.salesCount}</td>
                                        <td>
                                            <div className="icon-container">
                                                <button>
                                                    <CiLogin size={24} />
                                                </button>
                                                <button>
                                                    <CiEdit size={24} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Library;