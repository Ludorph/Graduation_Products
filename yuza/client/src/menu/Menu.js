import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // fortawesome에서 SVG 아이콘 import
import { faAppleWhole } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Link, useLocation } from 'react-router-dom'; // 리액트 라우터
import './menustyle.css'; // CSS 파일
import UserSubmenu from './UserSubmenu';
import axios from 'axios';

function Menu({ isHovered, setIsHovered }) {
    const [isOpen, setIsOpen] = useState(false);
    const [expandMenu, setExpandMenu] = useState(false);
    const [departments, setDepartments] = useState([]);
    const menuRef = useRef(null);
    const bodyRef = useRef(document.body);
    const overlayRef = useRef();
    const location = useLocation();

    useEffect(() => {
        setIsHovered(false);
    }, [location, setIsHovered]);

    // useEffect(() => {
    //     const fetchDepartments = async () => {
    //       try {
    //         const response = await axios.get('http://localhost:5000/test');
    //         setDepartments(response.data);
    //       } catch (error) {
    //         console.error('학과 정보 가져오기 실패:', error);
    //       }
    //     };
    //     fetchDepartments();
    //   }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        bodyRef.current.classList.toggle('overflow');
        overlayRef.current.classList.toggle('overlay--active');
        menuRef.current.classList.toggle('open');
    };

    useEffect(() => {
        const storedDepartments = localStorage.getItem('departments');
        console.log('Stored departments (raw):', storedDepartments);
        if (storedDepartments) {
            try {
                const parsedDepartments = JSON.parse(storedDepartments);
                console.log('Parsed departments:', parsedDepartments);
                if (Array.isArray(parsedDepartments) && parsedDepartments.length > 0) {
                    setDepartments(parsedDepartments);
                } else {
                    console.error('Stored departments is empty or not an array:', parsedDepartments);
                    setDepartments([]);
                }
            } catch (error) {
                console.error('Error parsing stored departments:', error);
                setDepartments([]);
            }
        } else {
            console.log('No departments found in localStorage');
        }
    }, []);

    /* 학과명을 클릭하면 서브메뉴가 닫히게 하기 */
    const handleLinkClick = () => {
        // 클릭 이벤트 발생 후 약간의 지연 시간을 두고 메뉴를 닫습니다.
        setTimeout(() => {
            setIsHovered(false);
        }, 50);
    };


    // const departments = [
    //     {
    //         name: '공학부',
    //         majors: ['기계시스템전공', '소방설비안전전공', '전기공학전공', '전자공학전공', '컴퓨터소프트웨어전공', '게임콘텐츠전공', '인공지능전공', '컴퓨터정보통신전공', 'IT비즈니스전공', '기계설계전공', '3D프린팅금형전공', '자동화공학과']
    //     },
    //     {
    //         name: '디자인문화학부',
    //         majors: ['산업디자인전공', '시각디자인전공', '패션디자인전공', '실내건축전공', '광고미디어전공', '방송영상전공', '애니메이션웹툰전공', '방송문예창작전공', '방송연예전공']
    //
    //     },
    //     {
    //         name: '건강보건학부',
    //         majors: ['식품영양학과', '보건의료행정학과', '작업치료과', '반려동물보건학과', '응급구조과']
    //
    //     },
    //     {
    //         name: '건강생활학부',
    //         majors: ['유한바이오제약전공', '유한생명화공전공', '피부메이크업전공', '뷰티화장품전공', '사회복지전공', '스포츠재활전공', '반려동물산업전공', '호텔조리전공', '카페베이커리전공', '아동보육전공']
    //
    //     },
    //     {
    //         name: '비즈니스학부',
    //         majors: ['호텔관광전공', '일본비즈니스전공', '경영정보전공', '세무회계전공', '항공서비스학과', '항공경영전공', '유통물류전공', '중국비즈니스전공']
    //
    //     }
    // ];

    return (
        <header className="navbar sticky">
            <a href="/" className="logo"><FontAwesomeIcon icon={faAppleWhole} /> YUJA</a>
            <div className="menu-btn" onClick={toggleMenu}>
                <div className="menu-btn__lines"></div>
            </div>

            <ul className="menu-items">
                <li
                    className="mega-menu-hover"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <a href="#" className="menu-item first-item expand-btn">
                        과별 자격증
                    </a>

                    {isHovered && (
                        <div className="mega-menu sample">
                            <div className="content">
                                {console.log('Rendering departments:', departments)}
                                {departments.length > 0 ? (
                                    departments.map((dept, deptIndex) => (
                                        <div className="col" key={dept.name}>
                                            <section>
                                                <div className="menu-title">{dept.name}</div>
                                                <ul className="mega-links">
                                                    {dept.majors.map((major, majorIndex) => (
                                                        <li key={major.id}>
                                                            <Link
                                                                to={`/dp/${deptIndex + 1}/${majorIndex + 1}`}
                                                                className="menu-item"
                                                                onClick={handleLinkClick}
                                                            >
                                                                {major.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </section>
                                        </div>
                                    ))
                                ) : (
                                    <div>Loading departments...</div>
                                )}
                            </div>
                        </div>
                    )}

                </li>
                <li><Link to="/board/jokbo" className="menu-item first-item" onClick={handleLinkClick}>족보게시판</Link></li>
                <li><Link to="/board/cert" className="menu-item first-item" onClick={handleLinkClick}>문제게시판</Link></li>
                <li><Link to="/board/free" className="menu-item first-item" onClick={handleLinkClick}>자유게시판</Link></li>
                <UserSubmenu />
            </ul>
        </header>
    );
}

export default Menu;