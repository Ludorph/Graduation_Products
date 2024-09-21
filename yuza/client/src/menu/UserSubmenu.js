import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './usersubmenu.css';
import RotatingGradientBorder from './RotatingGradientBorder';
import userimg from '../img/userimg/user-img2.png';

function UserSubmenu() {
    const [isOpen, setIsOpen] = useState(false);
    const submenuRef = useRef(null);
    const userLevel = 7; // 임시로 사용자 레벨 하드코딩

    const toggleSubmenu = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (submenuRef.current && !submenuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <li className="user-submenu-container" ref={submenuRef}>
            <a href="#" className="menu-item first-item" onClick={toggleSubmenu}>
                <FontAwesomeIcon icon={faUser} style={{ fontSize: '18px' }} />
            </a>
            {isOpen && (
                <div className="user-submenu">
                    <div className="user-submenu-top">
                        <div className="user-icon-wrapper">
                            {/* RotatingGradientBorder로 level값을 props를 전달 --> 테두리 svg 생성 반환 */}
                            <RotatingGradientBorder level={userLevel} />
                            <Link to="/mypage">
                                <img src={userimg} alt="User" className="user-icon" />
                            </Link>
                        </div>
                        <Link to="/edit-profile" className="settings-icon">
                            <FontAwesomeIcon icon={faCog} />
                        </Link>
                    </div>
                    <div className="user-submenu-bottom">
                        <Link to="/purchase-history" className="submenu-button">포인트 관리</Link>
                        <Link to="/edit-profile" className="submenu-button">내 계정</Link>
                        <Link to="/find-certificate" className="submenu-button">라이브러리</Link>
                    </div>
                </div>
            )}
        </li>
    );
}

export default UserSubmenu;