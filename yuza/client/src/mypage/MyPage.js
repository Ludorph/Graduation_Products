import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSackDollar, faBook, faPencilAlt, faChartBar, faToolbox, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Outlet, useNavigate } from 'react-router-dom';
import RotatingGradientBorder from '../menu/RotatingGradientBorder';
import userimg from '../img/userimg/user-img2.png';
import PointSet from './User/Point/PointSet';
import Library from './User/Library/Library';
import AdminSetQuestion from './Admin/AdminSetQuestion';
import './mypage.css';

const MyPage = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const userLevel = 7; // 임시로 사용자 레벨 하드코딩
  const navigate = useNavigate();

  const menuItems = [
    { id: 'point', icon: faSackDollar, label: '포인트 관리' },
    { id: 'edit', icon: faCog, label: '정보수정' },
    { id: 'library', icon: faBook, label: '라이브러리'},
    { id: 'frequently', icon: faChartBar, label: '자주 공부한 내역' },
  ];

  const adminMenuItems = [
    { id: 'admin1', label: '문제 관리' },
    { id: 'admin2', label: '관리자 메뉴 2' },
    { id: 'admin3', label: '관리자 메뉴 3' },
  ];

  const handleMenuClick = (id) => {
    setSelectedMenu(id);
    if (id === 'point') {
      navigate('point-set');
    } else if (id === 'admin1') {
      navigate('admin-setquestion');
    } else {
      navigate('');
    }
  };

  const handleAdminClick = () => {
    setIsAdminOpen(!isAdminOpen);
    // setSelectedMenu('admin'); 드롭다운 메뉴를 클릭하면 드롭다운이 닫히는 문제 수정
  };

  const renderContent = () => {
    if (!selectedMenu) {
      return <div className="mypage-empty-content">왼쪽 영역에서 메뉴를 선택해주세요</div>;
    }

    // 선택된 메뉴에 따라 다른 내용을 렌더링
    switch (selectedMenu) {
      case 'point':
        return <PointSet></PointSet>
      case 'edit':
        return <div>정보수정 내용</div>;
      case 'library':
        return <Library></Library>;
      case 'frequently':
        return <div>자주 공부한 내역</div>;
      case 'admin1':
        return <AdminSetQuestion></AdminSetQuestion>;
      case 'admin2':
        return <div>관리자 메뉴 2 내용</div>;
      case 'admin3':
        return <div>관리자 메뉴 3 내용</div>;
      default:
        return null;
    }
  };

  return (
    <div className="mypage-container">
      <div className="mypage-left-section">
        <div className="mypage-profile-area">
          <div className="mypage-user-icon-wrapper">
            <RotatingGradientBorder level={userLevel} />
            <img src={userimg} alt="User" className="mypage-user-icon" />
          </div>
          <div className="mypage-nickname">사용자 닉네임</div>
        </div>
        <nav className="mypage-menu-list">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`mypage-menu-item ${selectedMenu === item.id ? 'mypage-active' : ''}`}
              onClick={() => handleMenuClick(item.id)}
            >
              <FontAwesomeIcon icon={item.icon} className="mypage-menu-icon" />
              <span>{item.label}</span>
            </button>
          ))}
          <div className="mypage-admin-section">
            <button
              className={`mypage-menu-item mypage-admin-item ${isAdminOpen ? 'mypage-admin-active' : ''}`}
              onClick={handleAdminClick}
            >
              <div className="mypage-admin-content">
                <FontAwesomeIcon icon={faToolbox} className="mypage-menu-icon" />
                <span className="mypage-admin-label">관리자 도구&nbsp;&nbsp;</span>
                <FontAwesomeIcon icon={faCaretDown} className={`mypage-admin-caret ${isAdminOpen ? 'mypage-admin-caret-open' : ''}`} />
              </div>
            </button>
            {isAdminOpen && (
              <div className="mypage-admin-dropdown">
                {adminMenuItems.map((item) => (
                  <button
                    key={item.id}
                    className={`mypage-menu-item mypage-admin-subitem ${selectedMenu === item.id ? 'mypage-active' : ''}`}
                    onClick={() => handleMenuClick(item.id)}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>
      <div className="mypage-right-section">
        {renderContent()}
      </div>
    </div>
  );
};

export default MyPage;