import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/ko';  // 한국어 로케일 추가
import styled, { createGlobalStyle } from 'styled-components';

// 로케일 설정
moment.locale('ko');
const localizer = momentLocalizer(moment);

const formats = {
  monthHeaderFormat: (date, culture, localizer) =>
    localizer.format(date, 'YYYY년 M월', culture),
};

const messages = {
  // 버튼 텍스트 변경
  month: '월',
  week: '주',
  day: '일',
  agenda: '일정',
};

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'NanumSquareNeoLight';
    src: url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-aLt.eot);
    src: url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-aLt.eot?#iefix) format("embedded-opentype"),
         url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-aLt.woff) format("woff"),
         url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-aLt.ttf) format("truetype");
  }

  @font-face {
    font-family: 'NanumSquareNeoBold';
    src: url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-bRg.eot);
    src: url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-bRg.eot?#iefix) format("embedded-opentype"), 
         url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-bRg.woff) format("woff"), 
         url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-bRg.ttf) format("truetype");
    font-weight: normal;
    font-style: normal;
  }


@font-face {
    font-family: 'Ownglyph_eunbyul21-Rg';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2405-2@1.0/Ownglyph_eunbyul21-Rg.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

  .rbc-calendar, .rbc-calendar * {
    font-family: 'NanumSquareNeoLight', sans-serif !important;
  }
`;

const StyledCalendarContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 15px 36px;
  box-sizing: border-box;

  .rbc-header {
    font-weight: bold;
    
  }

  .rbc-btn-group button {
    font-weight: normal;
    font-family: 'Ownglyph_eunbyul21-Rg', sans-serif !important;
    font-Size: 13px;
  }

  // 2024년 #월 텍스트
  .rbc-toolbar-label {
    font-weight: bold;
    font-size: 1.2em;
    font-family: 'NanumSquareNeoBold', sans-serif !important;
    color: #535353;
    
  }

  // 일정 이벤트 
  .rbc-event-content { 
    font-family: 'Ownglyph_eunbyul21-Rg', sans-serif !important;
    font-Size: 11px;
  }

  // 오늘 날짜 부분
  .rbc-today {
    background-color: #F7A3A7 !important;
  }
`;

const eventStyleGetter = (event, start, end, isSelected) => {
  let backgroundColor = '#3174ad';
  if (event.title.includes('필기')) {
    backgroundColor = '#C8D7C4';  // 접수 이벤트는 녹색
  } else if (event.title.includes('실기')) {
    backgroundColor = '#B7B6D6';  // 시험 이벤트는 남색
  }

  const style = {
    backgroundColor, // eventStyleGetter에서 설정된 값
    borderRadius: '10px',
    opacity: 0.9,
    color: 'black', // 이벤트 글자색
    border: '0px',
    display: 'block'
  };

  return { style };
};

// Depart.js에서 캘린더를 생성할 때 events props 전달


const CertificationCalendar = ({ events, title }) => {
  return (
    <>
      <GlobalStyle />
      <div style={{
        width: '100%',
        height: '800px', // 세로간격
        backgroundColor: '#f4f4f4',
        padding: '20px',
        borderRadius: '8px',
        marginTop: '40px',
        position: 'relative',
        boxSizing: 'border-box',
      }}>
        <div style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <StyledCalendarContainer>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              formats={formats}
              messages={messages} // 월, 주, 일, 일정
              style={{
                height: '100%',
                width: '100%',
              }}
              eventPropGetter={eventStyleGetter}
            />
          </StyledCalendarContainer>
        </div>
      </div>
    </>
  );
};

export default CertificationCalendar;