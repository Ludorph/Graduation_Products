import { Button, Nav, Navbar, Container, NavDropdown, Row, Col, Card } from 'react-bootstrap';
import './App.css';
import './custom.css'; // 메인페이지 배경화면
import './card.css';  // 메인페이지의 카드 3개
import './fonts.css'; // 폰트 전역선언(단 styled-components는 적용 안 돼서 font선언 다시 해야 됨)
import MenuBar from './menu/Menu'; // 상단 메뉴바
import SearchBox from './search/SearchBox'; // 메인페이지 검색바
import CertiGallery from './certigallery/CertiGallery.js';
import Depart from './department/Depart.js'; // 학과페이지(Link는 Menu.js에서)
import JokboBoard from './Board/JokboBoard.js'; // 족보게시판
import CertificationBoard from './Board/CertificationBoard/CertificationBoard.js'
import FreeBoard from './Board/FreeBoard/FreeBoard.js'
import MypageRoutes from './mypage/MypageRoutes.js'

import React, { useState, useCallback, useEffect } from 'react';
import { Routes, Route, Link, Switch } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query';

// import AlertBar from './alert/AlertBar';

const queryClient = new QueryClient();

function App() {

  const [isHovered, setIsHovered] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false); // 추가


  // 데이터 흐름
  // App.js -> MypageRoutes -> MyPage -> AdminSetDepart
  const [departments, setDepartments] = useState(() => {
    let currentId = 1;
    return [
      {
        name: '공학부',
        majors: ['기계시스템전공', '소방설비안전전공', '전기공학전공', '전자공학전공', '컴퓨터소프트웨어전공', '게임콘텐츠전공', '인공지능전공', '컴퓨터정보통신전공', 'IT비즈니스전공', '기계설계전공', '3D프린팅금형전공', '자동화공학과'].map(major => ({
          id: currentId++,
          name: major
        }))
      },
      {
        name: '디자인문화학부',
        majors: ['산업디자인전공', '시각디자인전공', '패션디자인전공', '실내건축전공', '광고미디어전공', '방송영상전공', '애니메이션웹툰전공', '방송문예창작전공', '방송연예전공'].map(major => ({
          id: currentId++,
          name: major
        }))
      },
      {
        name: '건강보건학부',
        majors: ['식품영양학과', '보건의료행정학과', '작업치료과', '반려동물보건학과', '응급구조과'].map(major => ({
          id: currentId++,
          name: major
        }))
      },
      {
        name: '건강생활학부',
        majors: ['유한바이오제약전공', '유한생명화공전공', '피부메이크업전공', '뷰티화장품전공', '사회복지전공', '스포츠재활전공', '반려동물산업전공', '호텔조리전공', '카페베이커리전공', '아동보육전공'].map(major => ({
          id: currentId++,
          name: major
        }))
      },
      {
        name: '비즈니스학부',
        majors: ['호텔관광전공', '일본비즈니스전공', '경영정보전공', '세무회계전공', '항공서비스학과', '항공경영전공', '유통물류전공', '중국비즈니스전공'].map(major => ({
          id: currentId++,
          name: major
        }))
      }
    ];
  });

  // const handleSaveDepartments = (updatedDepartments) => {
  //   // AdminSetDepart에서 받은 데이터를 App에서 사용하는 형식으로 변환
  //   const newDepartments = updatedDepartments.map(dept => ({
  //     name: dept.name,
  //     majors: dept.majors.map(major => ({
  //       id: major.id,
  //       name: major.name
  //     }))
  //   }));

  //   // 상태 업데이트 (새로운 배열 참조 생성)
  //   setDepartments(updatedDepartments);

  //   // 콘솔에 로그 출력 
  //   console.log('Departments updated:', newDepartments);
  // };

  const handleSaveDepartments = useCallback((updatedDepartments) => {
    console.log('handleSaveDepartments called in App');
    console.log('Updated departments:', updatedDepartments);
    setDepartments(updatedDepartments);
  }, []);

  useEffect(() => {
    console.log('Departments in App after update:', departments);
  }, [departments]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        { /* 알림바 import... 수정필요 */}
        {/* <div>
        <AlertBar/>
      </div> */}

        { /* 메뉴바 import */}
        <div>
          <MenuBar
            isHovered={isMenuHovered}
            setIsHovered={setIsMenuHovered}
            departments={departments}  // departments 전달
          />
        </div>

        { /* 리액트 라우터 --> 상세페이지 */}
        <div className={`main-bg ${isHovered ? 'blur' : ''}`}>  { /* 블러처리 스위치를 위한 코드 */}
          <Routes>
            <Route path="/" element={
              <>
                <div className="title-message">
                  <h1><span className='title-message-top'>Yuhan</span> <br />
                    <span className='title-message-bottom'>Students Certificate</span></h1>
                </div>

                { /* 검색상자 import */}
                <div>
                  <SearchBox />
                </div>

                <div className="card-container">
                  <div className="grid">
                    <div className="card">
                      <span className="icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.5 3.5C14.5 3.5 14.5 5.5 12 5.5C9.5 5.5 9.5 3.5 9.5 3.5H7.5L4.20711 6.79289C3.81658 7.18342 3.81658 7.81658 4.20711 8.20711L6.5 10.5V20.5H17.5V10.5L19.7929 8.20711C20.1834 7.81658 20.1834 7.18342 19.7929 6.79289L16.5 3.5H14.5Z" />
                        </svg>
                      </span>
                      <h4>Products</h4>
                      <p>
                        Standard chunk of Lorem Ipsum used since the 1500s is showed below
                        for those interested.
                      </p>
                      <div className="shine"></div>
                      <div className="background">
                        <div className="tiles">
                          <div className="tile tile-1"></div>
                          <div className="tile tile-2"></div>
                          <div className="tile tile-3"></div>
                          <div className="tile tile-4"></div>
                          <div className="tile tile-5"></div>
                          <div className="tile tile-6"></div>
                          <div className="tile tile-7"></div>
                          <div className="tile tile-8"></div>
                          <div className="tile tile-9"></div>
                          <div className="tile tile-10"></div>
                        </div>
                        <div className="line line-1"></div>
                        <div className="line line-2"></div>
                        <div className="line line-3"></div>
                      </div>
                    </div>
                    <div className="card">
                      <span className="icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.5 9.5V5.5C4.5 4.94772 4.94772 4.5 5.5 4.5H9.5C10.0523 4.5 10.5 4.94772 10.5 5.5V9.5C10.5 10.0523 10.0523 10.5 9.5 10.5H5.5C4.94772 10.5 4.5 10.0523 4.5 9.5Z" />
                          <path d="M13.5 18.5V14.5C13.5 13.9477 13.9477 13.5 14.5 13.5H18.5C19.0523 13.5 19.5 13.9477 19.5 14.5V18.5C19.5 19.0523 19.0523 19.5 18.5 19.5H14.5C13.9477 19.5 13.5 19.0523 13.5 18.5Z" />
                          <path d="M4.5 19.5L7.5 13.5L10.5 19.5H4.5Z" />
                          <path d="M16.5 4.5C18.1569 4.5 19.5 5.84315 19.5 7.5C19.5 9.15685 18.1569 10.5 16.5 10.5C14.8431 10.5 13.5 9.15685 13.5 7.5C13.5 5.84315 14.8431 4.5 16.5 4.5Z" />
                        </svg>
                      </span>
                      <h4>Categories</h4>
                      <p>
                        Standard chunk of Lorem Ipsum used since the 1500s is showed below
                        for those interested.
                      </p>
                      <div className="shine"></div>
                      <div className="background">
                        <div className="tiles">
                          <div className="tile tile-1"></div>
                          <div className="tile tile-2"></div>
                          <div className="tile tile-3"></div>
                          <div className="tile tile-4"></div>
                          <div className="tile tile-5"></div>
                          <div className="tile tile-6"></div>
                          <div className="tile tile-7"></div>
                          <div className="tile tile-8"></div>
                          <div className="tile tile-9"></div>
                          <div className="tile tile-10"></div>
                        </div>
                        <div className="line line-1"></div>
                        <div className="line line-2"></div>
                        <div className="line line-3"></div>
                      </div>
                    </div>

                    <div className="card">
                      <span className="icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.5 9.5V5.5C4.5 4.94772 4.94772 4.5 5.5 4.5H9.5C10.0523 4.5 10.5 4.94772 10.5 5.5V9.5C10.5 10.0523 10.0523 10.5 9.5 10.5H5.5C4.94772 10.5 4.5 10.0523 4.5 9.5Z" />
                          <path d="M13.5 18.5V14.5C13.5 13.9477 13.9477 13.5 14.5 13.5H18.5C19.0523 13.5 19.5 13.9477 19.5 14.5V18.5C19.5 19.0523 19.0523 19.5 18.5 19.5H14.5C13.9477 19.5 13.5 19.0523 13.5 18.5Z" />
                          <path d="M4.5 19.5L7.5 13.5L10.5 19.5H4.5Z" />
                          <path d="M16.5 4.5C18.1569 4.5 19.5 5.84315 19.5 7.5C19.5 9.15685 18.1569 10.5 16.5 10.5C14.8431 10.5 13.5 9.15685 13.5 7.5C13.5 5.84315 14.8431 4.5 16.5 4.5Z" />
                        </svg>
                      </span>
                      <h4>Categories</h4>
                      <p>
                        Standard chunk of Lorem Ipsum used since the 1500s is showed below
                        for those interested.
                      </p>
                      <div className="shine"></div>
                      <div className="background">
                        <div className="tiles">
                          <div className="tile tile-1"></div>
                          <div className="tile tile-2"></div>
                          <div className="tile tile-3"></div>
                          <div className="tile tile-4"></div>
                          <div className="tile tile-5"></div>
                          <div className="tile tile-6"></div>
                          <div className="tile tile-7"></div>
                          <div className="tile tile-8"></div>
                          <div className="tile tile-9"></div>
                          <div className="tile tile-10"></div>
                        </div>
                        <div className="line line-1"></div>
                        <div className="line line-2"></div>
                        <div className="line line-3"></div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* 요소 추가 예정 영역 (임시) */}
                <div className='temp-area'
                  style={{ backgroundColor: '#33363b', height: '500px', width: '100%' }}>
                </div>
              </>


            } />
            <Route path="/certigallery/:certId" element={<CertiGallery />} />
            <Route path="/dp/:deptId/:majorId" element={<Depart />} />
            <Route path="/board/jokbo/*" element={<JokboBoard />} />
            <Route path="/board/cert/*" element={<CertificationBoard />} />
            <Route path="/board/free/*" element={<FreeBoard />} />
            <Route
              path="/mypage/*"
              element={<MypageRoutes departments={departments} />}
            />
          </Routes>
        </div>


      </div>
    </QueryClientProvider>
  );
}


export default App;


