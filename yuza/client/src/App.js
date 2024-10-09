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
import UserInfo from './UserInfo';

/* 여기서 로그인, 로그아웃, 회원가입 컴포넌트 Routes */
import AuthRoutes from './authentication/AuthRoutes.js';
// import Register from "./Register";
// import Login from './Login';


import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Switch } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';

// import AlertBar from './alert/AlertBar';

const queryClient = new QueryClient();

function App() {

    const [isHovered, setIsHovered] = useState(false);
    const [isMenuHovered, setIsMenuHovered] = useState(false); // 추가
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users/me', { withCredentials: true });
                if (response.data.user) {
                    setUser(response.data.user);
                }
            } catch (error) {
                console.log('사용자 정보 가져오기 실패:', error);
            }
        };
        fetchUser();
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                { /* 알림바 import... 수정필요 */}
                {/* <div>
        <AlertBar/>
      </div> */}

                { /* 메뉴바 import */}
                <div>
                    <MenuBar isHovered={isMenuHovered} setIsHovered={setIsMenuHovered} />  { /* 블러처리를 위한 상태함수 전달 */}
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

                                {/*{!user ? (*/}
                                {/*    <>*/}
                                {/*      <Register />*/}
                                {/*      <hr />*/}
                                {/*      <Login setUser={setUser} />*/}
                                {/*    </>*/}
                                {/*) : (*/}
                                {/*    <UserInfo user={user} setUser={setUser} />*/}
                                {/*)}*/}

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
                        {/* authentication관련 */}
                        <Route path="/auth/*" element={<AuthRoutes/>} />
                        <Route path="/certigallery/:certId" element={<CertiGallery />} />
                        <Route path="/dp/:deptId/:majorId" element={<Depart />} />
                        <Route path="/board/jokbo/*" element={<JokboBoard />}/>
                        <Route path="/board/cert/*" element={<CertificationBoard />}/>
                        <Route path="/board/free/*" element={<FreeBoard />}/>
                        <Route path="/mypage/*" element={<MypageRoutes />}/>
                    </Routes>
                </div>

            </div>
        </QueryClientProvider>
    );
}

export default App;