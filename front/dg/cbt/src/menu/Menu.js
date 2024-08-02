import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // fortawesome에서 SVG 아이콘 import
import { faAppleWhole } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom'; // 리액트 라우터
import './menustyle.css'; // CSS 파일

function Menu({ setIsHovered }) {
    const [isOpen, setIsOpen] = useState(false);
    const [expandMenu, setExpandMenu] = useState(false);
    const menuRef = useRef(null);
    const bodyRef = useRef(document.body);
    const overlayRef = useRef();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        bodyRef.current.classList.toggle('overflow');
        overlayRef.current.classList.toggle('overlay--active');
        menuRef.current.classList.toggle('open');
    };

    const toggleExpand = () => {
        setExpandMenu(!expandMenu);
    };


    const departments = [
        {
            name: '공학부',
            majors: ['기계시스템전공', '소방설비안전전공', '전기공학전공', '전자공학전공', '컴퓨터소프트웨어전공', '게임콘텐츠전공', '인공지능전공', '컴퓨터정보통신전공', 'IT비즈니스전공', '기계설계전공', '3D프린팅금형전공', '자동화공학과']
        },
        {
            name: '디자인문화학부',
            majors: ['산업디자인전공', '시각디자인전공', '패션디자인전공', '실내건축전공', '광고미디어전공', '방송영상전공', '애니메이션웹툰전공', '방송문예창작전공', '방송연예전공']

        },
        {
            name: '건강보건학부',
            majors: ['식품영양학과', '보건의료행정학과', '작업치료과', '반려동물보건학과', '응급구조과']
  
        },
        {
            name: '건강생활학부',
            majors: ['유한바이오제약전공', '유한생명화공전공', '피부메이크업전공', '뷰티화장품전공', '사회복지전공', '스포츠재활전공', '반려동물산업전공', '호텔조리전공', '카페베이커리전공', '아동보육전공']
 
        },
        {
            name: '비즈니스학부',
            majors: ['호텔관광전공', '일본비즈니스전공', '경영정보전공', '세무회계전공', '항공서비스학과', '항공경영전공', '유통물류전공', '중국비즈니스전공']
  
        }
    ];




    return (
        <>
            <header className="navbar sticky">
                <a href="/" className="logo"><FontAwesomeIcon icon={faAppleWhole} /> YUJA</a>
                <div className="menu-btn" onClick={toggleMenu}>
                    <div className="menu-btn__lines"></div>
                </div>

                <ul className="menu-items">

                    <li className="mega-menu-hover"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}>
                        <a href="#"
                            className="menu-item first-item expand-btn"
                        >
                            과별 자격증
                        </a>

                        <div className="mega-menu sample">
                            <div className="content">
                                {departments.map((dept, index) => (
                                    <div className="col" key={index}>
                                        <section>
                                            <div className="menu-title">{dept.name}</div>
                                            <ul className="mega-links">
                                                {dept.majors.map((major, majorIndex) => (
                                                    <li key={majorIndex}>
                                                        <Link to={`/dp/${index + 1}/${majorIndex + 1}`} className="menu-item">
                                                            {major}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                        {/* <div className="featured-image">
                                            <img src={dept.featuredImage} alt={`${dept.name} 대표 이미지`} />
                                        </div> */}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </li>
                    <li><a href="#" className="menu-item first-item">족보게시판</a></li>
                    <li>
                        <a href="#" className="menu-item first-item">질문게시판</a>
                    </li>
                    <li>
                        <a href="#" className="menu-item first-item">자유게시판</a>
                    </li>

                    <li><a href="#" className="menu-item first-item">
                        <FontAwesomeIcon icon={faUser} style={{ fontSize: '18px' }} /></a></li>

                </ul>

            </header>
        </>

    )

}

export default Menu;