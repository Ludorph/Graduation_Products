import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPencil, faTools } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // 리액트 라우터
import './departstyle.css'; // CSS 파일

import styled from 'styled-components';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import CertificationCalendar from './calendar/CertificationCalendar.js';
import { getCertificationEvents } from './calendar/certificationEvents.js';


function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="custom-arrow next-arrow"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faChevronRight} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="custom-arrow prev-arrow"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faChevronLeft} />
    </div>
  );
}


// styled-components

const ContentContainer = styled.div`
  max-width: 1030px;
  margin: 0 auto;
  padding: 0px 30px;
  position: relative;
  
`;

const SectionTitle = styled.div`
  font-family: 'NanumSquareNeoBold', sans-serif;
  font-weight: 900;
  font-size: 23px;
  color: #535353;
  position: absolute;
  top: -10px;
  left: 0;
  margin: 0;
  padding: 5px 30px;
  background-color: #f4f4f4;   // '주요 시험일정' 텍스트 배경색
  z-index: 1;
`;

// 캘린더 최종 부모영역
const BackgroundCalendar = styled.div`
  position: relative;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  height: 900px; // 캘린더 세로 간격조정
  background-color: #f4f4f4;
  margin-top: 60px;
  padding: 20px 0 0;  // 주요 시험일정 위쪽 간격
  justify-content: center;
  align-items: center;
`;

// 캘린더 부모영역
const CalendarContainer = styled.div`
  max-width: 1030px;
  margin: 0 auto;
  position: relative;
  height: calc(100% - 40px); // 상단 여백을 위해 높이 조정
`;


const SliderWrapper = styled.div`
  width: 100%;
  max-width: 1030px;
  margin: 0 auto;
  padding: 30px;
  box-sizing: border-box;
  position: relative;
  padding: 5px 30px 30px; // 상단 패딩을 더 줄임(슬라이더와 최상단 제목간의 간격조정)

  @font-face {
    font-family: 'NanumSquareNeoLight';
    src: url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-aLt.eot);
    src: url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-aLt.eot?#iefix) format("embedded-opentype"), url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-aLt.woff) format("woff"), url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-aLt.ttf) format("truetype");
  }

  .slide-title {
    font-family: 'NanumSquareNeoLight', sans-serif;
    color: #535353;
    font-size: 1.5rem;
    font-weight: 1000;
    padding-top: 20px;
    text-align: left;
  }



  .slick-slider {
    width: 100%;
  }

  .slick-list {
    margin: 0 -10px;
    padding: 20px 0 0; // 상단 패딩 추가하여 제목을 위한 공간 확보
  }

  .slick-slide {
    padding: 0 10px;
    box-sizing: border-box;
  }

  .slide-content {
    background-color: #fafafa;
    border-radius: 3px;
    overflow: hidden;
    height: 285px;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;
    margin: 10px 0;
  }

  .slide-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
    position: relative;  // overlay의 기준점으로 잡기 위해 포지션 추가

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

.slide-text {
    padding: 15px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h3 {
      font-family: 'NanumSquareNeoLight', sans-serif;
      font-weight: bold;
      margin: 0 0 5px;
      font-size: 16px;
      text-align: left;  // 제목 왼쪽 정렬
    }

    p {
      margin-top: 0;
      font-size: 14px;
      color: #666;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;  // 최대 2줄까지 표시
      -webkit-box-orient: vertical;
      text-align: left;  // 본문 왼쪽 정렬
    }

    .exam-info {    // 시험정보란 
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }

    .exam-tag {
      background-color: #e0e0e0;
      color: #333;
      padding: 3px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: bold;
    }
  }

  .slick-dots {
    bottom: -30px;

    li button:before {
      font-size: 7px;
      color: #333;
    }
  }

  .slick-prev, .slick-next {
    z-index: 1;
    &:before {
      color: #333;
    }
  }

  .custom-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    cursor: pointer;
    font-size: 24px;
    color: #333;
    transition: color 0.3s ease;

    &:hover {
      color: #000;
    }
  }

  .next-arrow {
    right: -40px;
  }

  .prev-arrow {
    left: -40px;
  }


  // 커버내용
  .slide-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column; // 세로배치
    justify-content: center; // 세로를 기준으로 중앙정렬
    align-items: center;
    opacity: 0;             // 초기상태에선 투명도 0
    transition: opacity 0.3s ease;
  }

  .slide-content:hover .slide-overlay {
    opacity: 1;
  }

  // 슬라이드에 자격증 일정을 간단히 표시하는 이미지 overlay
  .slide-overlay p {
    color: #ffffff; // 명시적으로 p 태그의 색상을 흰색으로 설정
    margin: 5px 0; // 상하 여백 추가
    font-size: 12px;
    text-align: center;
  }

  .slide-overlay .fa-icon {
    margin-right: 5px; // 아이콘과 텍스트 사이의 간격 추가
  }

  .overlay-button {
    background-color: #ffffff;
    color: #000000;
    border: none;
    padding: 10px 20px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #e0e0e0;
    }
  }

`;

function Depart() {
  const { deptId, majorId } = useParams();

  const certImages = {
    '1-1-1': require('../img/departimg/기계조립산업기사.png'),
    '1-1-2': require('../img/departimg/컴퓨터응용가공산업기사.png'),
    '1-1-3': require('../img/departimg/공조냉동기계산업기사.png'),
    '1-1-4': require('../img/departimg/가스산업기사.jpg')
  };

  const departments = {
    '1': {
      '1': '기계시스템전공',
      '2': '소방설비안전전공',
      '3': '전기공학전공',
      '4': '전자공학전공',
      '5': '컴퓨터소프트웨어전공',
      '6': '게임콘텐츠전공',
      '7': '인공지능전공',
      '8': '컴퓨터정보통신전공',
      '9': 'IT비즈니스전공',
      '10': '기계설계전공',
      '11': '3D프린팅금형전공',
      '12': '자동화공학과'
    },
    '2': {
      '1': '산업디자인전공',
      '2': '시각디자인전공',
      '3': '패션디자인전공',
      '4': '실내건축전공',
      '5': '광고미디어전공',
      '6': '방송영상전공',
      '7': '애니메이션웹툰전공',
      '8': '방송문예창작전공',
      '9': '방송연예전공'
    },
    // ... 학과 추가필요 --> 귀찮아서 이정도만
  };

  const certifications = {
    '1': {
      '1': [
        {
          name: '기계조립산업기사',
          image: certImages['1-1-1'],
          description: '기계 부품을 조립하고 기계 장치를 제작, 설치, 보수하는 기술자격',
          examInfo: {
            written: 3,
            practical: 3
          },
          signUpPeriod: '24.07.05 ~ 24.07.27',
          examDate: '24.10.19 ~ 24.11.08'
        },
        {
          name: '컴퓨터응용가공산업기사',
          image: certImages['1-1-2'],
          description: 'CAD/CAM 시스템을 활용하여 기계 부품을 가공하는 기술자격',
          examInfo: {
            written: 3,
            practical: 3
          },
          signUpPeriod: '24.07.05 ~ 24.07.27',
          examDate: '24.10.19 ~ 24.11.08'
        },
        {
          name: '공조냉동기계산업기사',
          image: certImages['1-1-3'],
          description: '냉동, 공조 시스템의 설계, 시공, 운전, 관리를 수행하는 기술자격',
          examInfo: {
            written: 3,
            practical: 3
          },
          signUpPeriod: '24.07.05 ~ 24.07.27',
          examDate: '24.10.19 ~ 24.11.08'
        },
        {
          name: '가스산업기사',
          image: certImages['1-1-4'],
          description: '가스관리를 담당하는 기술자격',
          examInfo: {
            written: 3,
            practical: 3
          },
          signUpPeriod: '24.07.05 ~ 24.07.27',
          examDate: '24.10.19 ~ 24.11.08'
        }
      ],
      '2': [
        {
          name: '기계조립산업기사',
          image: certImages['1-1-1'],
          description: '기계 부품을 조립하고 기계 장치를 제작, 설치, 보수하는 기술자격',
          examInfo: {
            written: 3,
            practical: 3
          },
          signUpPeriod: '24.07.05 ~ 24.07.27',
          examDate: '24.10.19 ~ 24.11.08'
        },
        {
          name: '컴퓨터응용가공산업기사',
          image: certImages['1-1-2'],
          description: 'CAD/CAM 시스템을 활용하여 기계 부품을 가공하는 기술자격',
          examInfo: {
            written: 3,
            practical: 3
          },
          signUpPeriod: '24.07.05 ~ 24.07.27',
          examDate: '24.10.19 ~ 24.11.08'
        },
        {
          name: '공조냉동기계산업기사',
          image: certImages['1-1-3'],
          description: '냉동, 공조 시스템의 설계, 시공, 운전, 관리를 수행하는 기술자격',
          examInfo: {
            written: 3,
            practical: 3
          },
          signUpPeriod: '24.07.05 ~ 24.07.27',
          examDate: '24.10.19 ~ 24.11.08'
        },
        {
          name: '가스산업기사',
          image: certImages['1-1-4'],
          description: '가스관리를 담당하는 기술자격',
          examInfo: {
            written: 3,
            practical: 3
          },
          signUpPeriod: '24.07.05 ~ 24.07.27',
          examDate: '24.10.19 ~ 24.11.08'
        }
      ],
    },
  };

  // certifications 객체에서 해당 학과와 전공에 맞는 자격증 목록을 가져옴
  // 만약 해당 학과나 전공에 대한 정보가 없으면 빈 배열([])을 반환 --> 선택된 전공의 자격증 목록을 표시하는 데 사용
  const currentCertifications = certifications[deptId]?.[majorId] || [];
  // 학과페이지명, 슬라이더 제목에 현재 전공 이름을 표시하는 데 사용
  const currentMajor = departments[deptId]?.[majorId] || '알 수 없는 전공';
  // 캘린더 이벤트 객체의 배열 저장(캘린더에 표시될 일정(이벤트들))
  const calendarEvents = getCertificationEvents(currentCertifications);

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  console.log(currentCertifications);



  return (
    <div>
      <div>
        <p className='main-title'>{currentMajor}</p>
      </div>
      <ContentContainer>
        <div style={{ position: 'relative', marginBottom: '60px' }}>
          <SectionTitle style={{ position: 'absolute', top: '-20px', left: '0', backgroundColor: 'white' }}> {/* SectionTitle 스타일 추가지정 */}
            {currentMajor} 주요 자격증
          </SectionTitle>
          <SliderWrapper>
            {/* 자격증 슬라이드 내용 */}
            <Slider {...settings}>
              {currentCertifications.map((cert, index) => (
                <div key={index}>
                  <div className="slide-content">
                    <div className="slide-image">
                      <img src={cert.image} alt={cert.name} />
                      <div className="slide-overlay">
                        {/* 슬라이드에 hover 했을 때 */}
                        <p><FontAwesomeIcon icon={faPencil} className="fa-icon" />{cert.signUpPeriod}</p>
                        <p><FontAwesomeIcon icon={faTools} className="fa-icon" />{cert.examDate}</p>
                      </div>
                    </div>
                    <div className="slide-text">
                      <h3>{cert.name}</h3>
                      <p>{cert.description}</p>
                      <div className="exam-info">
                        <span className="exam-tag">필기(연{cert.examInfo.written}회)</span>
                        <span className="exam-tag">실기(연{cert.examInfo.practical}회)</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </SliderWrapper>
        </div>


        <BackgroundCalendar>
          <CalendarContainer>
            <SectionTitle style={{ position: 'absolute', top: '-20px', left: '30px', backgroundColor: '#f4f4f4', zIndex: 1 }}>
              주요 시험일정
            </SectionTitle>
            <CertificationCalendar
              events={calendarEvents}
            // title={<SectionTitle>주요 시험일정</SectionTitle>}
            />
          </CalendarContainer>
        </BackgroundCalendar>
      </ContentContainer>


      {/* <h1>{deptId}학과 {majorId}전공 상세 페이지</h1> */}
    </div>
  );
}

export default Depart;