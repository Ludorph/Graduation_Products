import React, { useState } from 'react';
import './alertstyle.css'; // 스타일 시트 import

function AlertBar() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="alert-bar">
      <p>이곳은 중요한 안내사항을 표시하는 공간입니다!</p>
      <button onClick={handleClose}>X</button>
    </div>
  );
}

export default AlertBar;