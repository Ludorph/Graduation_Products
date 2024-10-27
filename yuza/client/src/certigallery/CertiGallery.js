import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CiEdit, CiSaveDown2 } from "react-icons/ci";
import InfoBubble from "../img/certigalleryimg/certgalleryInfo.png"
import InfoBubbleDetail from "../img/certigalleryimg/certgalleryInfodetail.png"
import CertGalleryTransfer from "../img/certigalleryimg/certgallerytransfer.png"
import DOMPurify from 'dompurify'; // HTML을 안전하게 렌더링

// 스타일드 컴포넌트
const Container = styled.div`
  width: 100%;
  height: 1100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 50px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  color: #424242;
`;

const CertName = styled.div`
  margin-top: 10px;
  color: #424242;
  font-family: 'NanumSquareNeoExtraBold', sans-serif;
  text-align: center;
  font-weight: bold;
  font-size: 1.9rem;
  letter-spacing : 1px;
`;

const CertManagement = styled.div`
  color: #424242;
  font-family: 'NanumSquareNeoBold', sans-serif;
  text-align: center;
  font-weight: bold;
  font-size: 1.0rem;
`;

const CertExplanation = styled.div`
  margin-top: 40px;
  color: #424242;
  font-weight: bold;
  font-family: 'NanumSquareNeoLight', sans-serif;
  text-align: center;
  font-size: 1.2rem;
  line-height: 1.6;

  strong {
    font-weight: bold;
  }
`;

// 여기부터 자격증 정보 영역
const DetailWrapper = styled.div`
  width: 100%;
  background-color: #edf1f4;
  margin-top: 125px;
  position: relative;
  z-index: 0; // z-index 추가
`;

// 네비게이션 바
const DetailWrapperTitle = styled.div`
  width: 100%;
  height: 60px;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;
  padding: 0;
`;

// 네비게이션 바의 버튼 속성
const NavigationButton = styled.button`
  padding: 5px 14px;
  margin: 0 4px;
  background-color: ${({ isActive }) => isActive ? '#ffffff' : '#f9f9f9'};
  color: ${({ isActive }) => isActive ? '#000000' : '#8f8f8f'};
  border: 1.5px solid ${({ isActive }) => isActive ? '#000000' : '#e0e0e0'};
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  font-family: 'NanumSquareNeoLight', sans-serif;
  font-weight: bold;
  transition: all 0.1s ease;

  // &:hover {
  //   background-color: ${({ isActive }) => isActive ? '#1976D2' : '#f8f9fa'};
  // }
`;

const ExamSchedule = styled.div`
  width: 100%;
  height: 900px;
  background-color: #ffffff;
  padding: 40px;
`;

const ScheduleContainer = styled.div`
  width: 1100px;
  margin: 0 auto;
`;

const TableTitle = styled.div`
  font-family: 'NanumSquareNeoBold', sans-serif;
  font-size: 1.6rem;
  font-weight: bold;
  color: #000000;
  text-align: left;
  margin-bottom: 10px;
`;

const TableSubTitle = styled.div`
  font-size: 0.9rem;
  color: #666666;
  margin-bottom: 20px;
  text-align: left;
`;

const Table = styled.table`
  min-width: 1100px; // 테이블의 최소 너비 설정
  width: 1100px; // 테이블의 고정 너비 설정
  border-collapse: collapse;
  table-layout: fixed;
  margin: 0 auto; // 테이블 중앙 정렬
`;

const Th = styled.th`
  padding: 15px 10px;
  background-color: #dfe3ec;
  color: #000000;
  font-weight: bold;
  text-align: center;
  border: 1px solid #ccc;
  font-size: 0.9rem;
  word-break: keep-all;
  line-height: 1.4;
  vertical-align: middle;
`;

const Td = styled.td`
  padding: 15px 10px;
  background-color: #ffffff;
  color: #111111;
  border: 1px solid #ccc;
  text-align: center;
  font-size: 0.85rem;
  line-height: 1.6;
  vertical-align: middle;
  white-space: pre-line;
`;

const ExamInfo = styled.div`
  background-color: #ffffff;  // 배경색도 하얀색으로 변경
  padding: 40px;  // 전체적인 padding 추가
`;


// 다운로드 버튼
const DownloadButton = styled.button`
  position: absolute;
  top: -40px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: black;
  font-family: 'NanumSquareNeoBold', sans-serif;
  font-size: 1rem;
  z-index: 1;

  svg {
    margin-right: 5px;
  }
`;

const BubbleRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-top: 0px;
`;

const BubbleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-top: 30px;
`;

const BubbleName = styled.div`
  margin-top: 50px;
  color: #6a92b4;
  font-family: 'BMJUA', sans-serif;
  text-align: center;
  font-size: 2.4rem;
  margin-bottom: 50px;
`;

const BubbleWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 200px;
`;

const BubbleImage = styled.img`
  width: 100%;
  height: 100%;
`;

const BubbleContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 80%;
`;

const BubbleTitle = styled.h3`
  font-family: 'NanumSquareNeoExtraBold', sans-serif;
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: #424242;
`;

const BubbleText = styled.p`
  font-family: 'NanumSquareNeoBold', sans-serif;
  font-size: 0.85rem;
  color: #424242;
  line-height: 1.5;
`;

// 여기부터 문제 게시판로 이동
const TransferSection = styled.div`
  width: 100%;
  height: 400px;
  background-color: #81acd1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TransferButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'NanumSquareNeoBold', sans-serif;
  font-weight: bold;
  font-size: 1.5rem;
  height: 100px;
  color: #424242;
`;

const TransferIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 5px;
  margin-bottom: 10px;
`;

// 여기부터 유의사항
const NoticeWrapper = styled.div`
  width: 100%;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;

const NoticeTitle = styled(CertName)`
  margin-bottom: 30px;
  font-family: 'NanumSquareNeoExtraBold', sans-serif;
`;

const NoticeContent = styled.div`
  width: 800px;
  height: 200px;
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const NoticeItem = styled.div`
  padding: 12px 0;
  border-bottom: ${props => props.isLast ? 'none' : '0.5px solid #ccc'};
  font-family: 'NanumSquareNeoBold', sans-serif;
  font-size: 16px;
`;


const ExamScheduleComponent = React.forwardRef(({ scheduleInfo }, ref) => {
  if (!scheduleInfo) return null;


  return (
    <ExamSchedule ref={ref}>
       <ScheduleContainer>
      <TableTitle>{scheduleInfo.title}</TableTitle>
      <TableSubTitle>{scheduleInfo.subtitle}</TableSubTitle>
      <Table>
        <thead>
          <tr>
            {scheduleInfo.headerData.map((header, index) => (
              <Th key={index}>{header}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scheduleInfo.scheduleData.map((row, index) => (
            <tr key={index}>
              <Td>{row.term}</Td>
              <Td>{row.writtenRegistration}</Td>
              <Td>{row.writtenExam}</Td>
              <Td>{row.writtenPassAnnouncement}</Td>
              <Td>{row.practicalRegistration}</Td>
              <Td>{row.practicalExam}</Td>
              <Td>{row.finalPassAnnouncement}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
      </ScheduleContainer>
    </ExamSchedule>
  );
});

const ExamInfoComponent = React.forwardRef(({ examInfo }, ref) => {
  if (!examInfo) return null;

  return (
    <ExamInfo ref={ref}>
      <ScheduleContainer>
        <TableTitle>{examInfo.title}</TableTitle>
        <Table>
          <thead>
          <tr>
              {examInfo.headerData.map((header, index) => (
                <Th key={index} style={{ 
                  width: header === "구분" ? "10%" :       // 구분 열
                         header === "시험과목" ? "40%" :   // 시험과목 열
                         "16.66%"                          // 나머지 열들
                }}>
                  {header}
                </Th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td rowSpan={5} style={{ backgroundColor: '#f8f9fa' }}>필기</Td>
              <Td>1. 소프트웨어 설계</Td>
              <Td rowSpan={5}>객관식 4지 택일형{"\n"}과목당 20문항{"\n"}(과목당 30분)</Td>
              <Td rowSpan={5}>100점을 만점으로 하여{"\n"}과목당 40점 이상,{"\n"}전 과목 평균 60점 이상</Td>
              <Td rowSpan={5}>19,400원</Td>
            </tr>
            {[
              "2. 소프트웨어 개발",
              "3. 데이터베이스 구축",
              "4. 프로그래밍 언어 활용",
              "5. 정보시스템 구축 관리"
            ].map((subject, index) => (
              <tr key={index}>
                <Td>{subject}</Td>
              </tr>
            ))}
            <tr>
              <Td rowSpan={12} style={{ backgroundColor: '#f8f9fa' }}>실기</Td>
              <Td>1. 요구사항 확인</Td>
              <Td rowSpan={12}>필답형(2시간 30분)</Td>
              <Td rowSpan={12}>100점을 만점으로 하여 60점 이상</Td>
              <Td rowSpan={12}>22,600원</Td>
            </tr>
            {[
              "2. 데이터입출력 구현",
              "3. 통합 구현",
              "4. 서버프로그램 구현",
              "5. 인터페이스 구현",
              "6. 화면 설계",
              "7. 애플리케이션테스트 관리",
              "8. SQL 응용",
              "9. 소프트웨어 개발 보안 구축",
              "10. 프로그래밍 언어 활용",
              "11. 응용SW기초 기술 활용",
              "12. 제품 소프트웨어 패키징"
            ].map((subject, index) => (
              <tr key={index}>
                <Td>{subject}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScheduleContainer>
    </ExamInfo>
  );
});

const createMarkup = (html) => {
  return { __html: DOMPurify.sanitize(html) };
}

function CertiGallery() {
  const navigate = useNavigate();
  const { certId } = useParams();
  const [certData, setCertData] = useState(null);
  const [activeSection, setActiveSection] = useState('schedule');
  const [isNavVisible, setIsNavVisible] = useState(false);
  // const [isNavFixed, setIsNavFixed] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const scheduleRef = useRef(null);
  const infoRef = useRef(null);
  const trendRef = useRef(null);
  const detailWrapperRef = useRef(null);
  const titleWrapperRef = useRef(null);


// Simplify useEffect
useEffect(() => {
  const handleScroll = () => {
    if (isScrolling) return;

    const schedule = scheduleRef.current?.getBoundingClientRect();
    const info = infoRef.current?.getBoundingClientRect();

    const offset = 60;

    if (info && info.top <= offset && info.bottom >= offset) {
      setActiveSection('info');
    } else if (schedule && schedule.top <= offset && schedule.bottom >= offset) {
      setActiveSection('schedule');
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [isScrolling]);

const scrollToSection = (sectionId) => {
  let targetRef;

  switch (sectionId) {
    case 'schedule':
      targetRef = scheduleRef;
      break;
    case 'info':
      targetRef = infoRef;
      break;
    default:
      return;
  }

  if (targetRef.current) {
    const yOffset = -60;
    const element = targetRef.current;
    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

    setIsScrolling(true);
    setActiveSection(sectionId);

    window.scrollTo({
      top: y,
      behavior: 'smooth',
    });

    setTimeout(() => {
      setIsScrolling(false);
    }, 500);
  }
};

  useEffect(() => {
    // 여기서 자격증 데이터를 가져옵니다.
    // 실제 구현에서는 API 호출이나 데이터베이스 쿼리를 사용합니다.
    fetchCertData(certId);
  }, [certId]);

  const fetchCertData = async (id) => {
    // 예시 데이터
    const data = {
      1: {
        name: "정보처리기사",
        management: "한국산업인력공단",
        Explanation: "공작기계인 범용선반, 범용밀링, 탁상드릴, 연삭기와 수공구 등을 사용하여<br/><strong>재료를 가공하는 것을 평가</strong>하는 시험입니다.",
        scheduleInfo: {
          title: "시험일정",
          subtitle: "정보처리기사(원서접수시간은 원서접수 첫날 10:00부터 마지막 날 18:00까지 임)",
          headerData: [
            "구분",
            "필기원서접수(인터넷)(휴일제외)",
            "필기시험",
            "필기합격(예정자)발표",
            "실기원서접수(휴일제외)",
            "실기시험",
            "최종합격자 발표일"
          ],
          scheduleData: [
            {
              term: "2024년 정기 기사 1회",
              writtenRegistration: "2024.01.23\n~\n2024.01.26\n[빈자리접수 : \n2024.02.09\n~\n2024.02.10]",
              writtenExam: "2024.02.15\n~\n2024.03.07",
              writtenPassAnnouncement: "2024.03.13",
              practicalRegistration: "2024.03.26\n~\n2024.03.29\n빈자리접수 :\n2024.04.21\n~\n2024.04.22",
              practicalExam: "2024.04.27\n~\n2024.05.17",
              finalPassAnnouncement: "2024.06.18"
            },
            {
              term: "2024년 정기 기사 2회",
              writtenRegistration: "2024.04.16\n~\n2024.04.19\n[빈자리접수 : \n2024.05.03\n~\n2024.05.04]",
              writtenExam: "2024.05.09\n~\n2024.05.28",
              writtenPassAnnouncement: "2024.06.05",
              practicalRegistration: "2024.06.25\n~\n2024.06.28\n빈자리접수 :\n2024.07.22\n~\n2024.07.23",
              practicalExam: "2024.07.28\n~\n2024.08.14",
              finalPassAnnouncement: "2024.09.10"
            },
            {
              term: "2024년 정기 기사 3회",
              writtenRegistration: "2024.06.18\n~\n2024.06.21\n[빈자리접수 : \n2024.06.29\n~\n2024.06.30]",
              writtenExam: "2024.07.05\n~\n2024.07.27",
              writtenPassAnnouncement: "2024.08.07",
              practicalRegistration: "2024.09.10\n~\n2024.09.13\n빈자리접수 :\n2024.10.14\n~\n2024.10.14",
              practicalExam: "2024.10.19\n~\n2024.11.08",
              finalPassAnnouncement: "2024.12.11"
            }
          ]
        },
        examInfo: {
          title: "시험과목 및 합격기준",
          headerData: ["구분", "시험과목", "검정방법", "합격기준", "응시료"],
          subjectData: {
            written: {
              subjects: [
                "1. 소프트웨어 설계",
                "2. 소프트웨어 개발",
                "3. 데이터베이스 구축",
                "4. 프로그래밍 언어 활용",
                "5. 정보시스템 구축 관리"
              ],
              method: "객관식 4지 택일형\n과목당 20문항\n(과목당 30분)",
              criteria: "100점을 만점으로 하여\n과목당 40점 이상,\n전 과목 평균 60점 이상",
              fee: "19,400원"
            },
            practical: {
              subjects: [
                "1. 요구사항 확인",
                "2. 데이터입출력 구현",
                "3. 통합 구현",
                "4. 서버프로그램 구현",
                "5. 인터페이스 구현",
                "6. 화면 설계",
                "7. 애플리케이션테스트 관리",
                "8. SQL 응용",
                "9. 소프트웨어 개발 보안 구축",
                "10. 프로그래밍 언어 활용",
                "11. 응용SW기초 기술 활용",
                "12. 제품 소프트웨어 패키징"
              ],
              method: "필답형(2시간 30분)",
              criteria: "100점을 만점으로 하여 60점 이상",
              fee: "22,600원"
            }
          }
        }
      },
      // ... 다른 자격증 데이터
    };
    setCertData(data[id]);
  };


  // 출제기준 다운로드 함수
  const handleDownload = () => {
    if (certData.downloadFile) {
      // 실제 구현에서는 서버의 파일 경로를 사용
      const fileUrl = `../file/${certData.downloadFile}`;

      fetch(fileUrl)
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = certData.downloadFile;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch(() => alert('파일 다운로드에 실패했습니다.'));
    } else {
      alert('다운로드할 파일이 없습니다.');
    }
  };

  // 문제 게시판 이동 버튼 관련(자동으로 해당 자격증이 선택되서 필터링 되도록)
  const handleTransfer = () => {
    navigate('/board/cert', { state: { selectedCertType: certData.name } });
  };


  if (!certData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <TitleWrapper ref={titleWrapperRef}>
        <CiEdit size={45} />
        <CertName>{certData.name}</CertName>
        <CertManagement>(시행처 : {certData.management})</CertManagement>
        <CertExplanation dangerouslySetInnerHTML={createMarkup(certData.Explanation)} />
      </TitleWrapper>

      <DetailWrapper ref={detailWrapperRef}>
      <DetailWrapperTitle>
          <NavigationButton
            isActive={activeSection === 'schedule'}
            onClick={() => scrollToSection('schedule')}
          >
            시험일정
          </NavigationButton>
          <NavigationButton
            isActive={activeSection === 'info'}
            onClick={() => scrollToSection('info')}
          >
            시험과목 및 합격기준
          </NavigationButton>
          {/* <NavigationButton
            isActive={activeSection === 'trend'}
            onClick={() => scrollToSection('trend')}
          >
            출제경향
          </NavigationButton> */}
        </DetailWrapperTitle>
        <DownloadButton onClick={handleDownload}>
          <CiSaveDown2 size={24} />
          출제기준 다운로드
        </DownloadButton>

        <ExamScheduleComponent ref={scheduleRef} scheduleInfo={certData.scheduleInfo} />  {/* 시험일정 */}
        <ExamInfoComponent ref={infoRef} examInfo={certData.examInfo} />                  {/* 시험정보 */}
        {/* <ExamTrend ref={trendRef} /> */}
      </DetailWrapper>

      <TransferSection>
        <TransferButton onClick={handleTransfer}>
          <TransferIcon src={CertGalleryTransfer} alt="Transfer Icon" />
          {certData.name} 공부하러 이동하기!
        </TransferButton>
      </TransferSection>

      <NoticeWrapper>
        <NoticeTitle>유의사항</NoticeTitle>
        <NoticeContent>
          <NoticeItem>
            01 원서접수시간은 원서접수 첫날 10:00부터 마지막 날 18:00까지 임.
          </NoticeItem>
          <NoticeItem>
            02 필기시험 합격예정자 및 최종합격자 발표시간은 해당 발표일 09:00임.
          </NoticeItem>
          <NoticeItem isLast>
            03 시험 일정은 종목별, 지역별로 상이할수 있음
          </NoticeItem>
        </NoticeContent>
      </NoticeWrapper>
    </Container>
  );
}

export default CertiGallery;