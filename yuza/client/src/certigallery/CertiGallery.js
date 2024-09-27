import React, { useState, useEffect } from 'react';
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

// 여기부터 시험정보
const DetailWrapper = styled.div`
  width: 100%;
  min-height: 900px;
  background-color: #edf1f4;
  margin-top: 125px;
  padding: 20px;
  position: relative;
`;

const DownloadButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: black;
  font-family: 'NanumSquareNeoBold', sans-serif;
  font-size: 1rem;

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
  height: 600px;
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


const createMarkup = (html) => {
  return { __html: DOMPurify.sanitize(html) };
}

function CertiGallery() {
  const navigate = useNavigate();
  const { certId } = useParams();
  const [certData, setCertData] = useState(null);

  useEffect(() => {
    // 여기서 자격증 데이터를 가져옵니다.
    // 실제 구현에서는 API 호출이나 데이터베이스 쿼리를 사용합니다.
    fetchCertData(certId);
  }, [certId]);

  const fetchCertData = async (id) => {
    // 예시 데이터
    const data = {
      1: {
        name: "기계조립산업기사",
        management: "한국산업인력공단",
        Explanation: "공작기계인 범용선반, 범용밀링, 탁상드릴, 연삭기와 수공구 등을 사용하여<br/><strong>재료를 가공하는 것을 평가</strong>하는 시험입니다.",
        written: {
          registration: "24.06.18~24.06.21",
          exam: "24.07.05~24.07.27",
          details: [
            "객관식 4지 택일형",
            "과목당 20문항(과목당 30분)",
            "과락 40점, 전 과목 평균 60점 이상"
          ],
          resultDate: "2024.08.07"
        },
        practical: {
          registration: "24.09.10~24.09.13",
          exam: "24.10.19~24.11.08",
          details: [
            "작업형(4시간 50분, 100점)",
            "60점 이상"
          ],
          resultDate: "2024.12.11"
        },
        downloadFile: "기계조립산업기사(2022.1.1～2026.12.31).hwp"
      },
      2: {
        name: "컴퓨터응용가공산업기사",
        management: "한국산업인력공단",
        Explanation: "컴퓨터응용가공에 대한 설명...",
        written: {
          registration: "날짜 미정",
          exam: "날짜 미정"
        },
        practical: {
          registration: "날짜 미정",
          exam: "날짜 미정"
        },
        downloadFile: "컴퓨터응용가공산업기사(2022.1.1～2026.12.31).hwp"
      },
      3: { name: "공조냉동기계산업기사" },
      4: { name: "가스산업기사" }
    };
    setCertData(data[id]);
  };

  if (!certData) {
    return <div>Loading...</div>;
  }

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

  return (
    <Container>
      {/* 자격증 제목 및 간단한 설명 */}
      <TitleWrapper>
        <CiEdit size={45} />
        <CertName>{certData.name}</CertName>
        <CertManagement>(시행처 : {certData.management})</CertManagement>
        <CertExplanation dangerouslySetInnerHTML={createMarkup(certData.Explanation)} />
      </TitleWrapper>
      {/* 말풍선에 시험 일정, 수수료 등 상세한 설명 */}
      <DetailWrapper>
        <DownloadButton onClick={handleDownload}>
          <CiSaveDown2 size={24} />
          출제기준 다운로드
        </DownloadButton>
        <BubbleName>시험 정보</BubbleName>
        <BubbleContainer>
          <BubbleRow>
            <BubbleWrapper>
              <BubbleImage src={InfoBubbleDetail} alt="InfoBubbleDetail" />
              <BubbleContent>
                <BubbleTitle>필기 시험 방식</BubbleTitle>
                <BubbleText>
                  {certData.written?.details.map((detail, index) => (
                    <React.Fragment key={index}>
                      {detail}
                      {index < certData.written.details.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </BubbleText>
              </BubbleContent>
            </BubbleWrapper>
            <BubbleWrapper>
              <BubbleImage src={InfoBubbleDetail} alt="InfoBubbleDetail" />
              <BubbleContent>
                <BubbleTitle>실기 시험 방식</BubbleTitle>
                <BubbleText>
                  {certData.practical?.details.map((detail, index) => (
                    <React.Fragment key={index}>
                      {detail}
                      {index < certData.practical.details.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </BubbleText>
              </BubbleContent>
            </BubbleWrapper>
          </BubbleRow>
          <BubbleRow>
            <BubbleWrapper>
              <BubbleImage src={InfoBubble} alt="Info Bubble" />
              <BubbleContent>
                <BubbleTitle>일정</BubbleTitle>
                <BubbleText>
                  접수 {certData.written?.registration || "날짜 미정"}<br />
                  시험 {certData.written?.exam || "날짜 미정"}
                </BubbleText>
              </BubbleContent>
            </BubbleWrapper>
            <BubbleWrapper>
              <BubbleImage src={InfoBubble} alt="Info Bubble" />
              <BubbleContent>
                <BubbleTitle>일정</BubbleTitle>
                <BubbleText>
                  접수 {certData.practical?.registration || "날짜 미정"}<br />
                  시험 {certData.practical?.exam || "날짜 미정"}
                </BubbleText>
              </BubbleContent>
            </BubbleWrapper>
          </BubbleRow>
          <BubbleRow>
            <BubbleWrapper>
              <BubbleImage src={InfoBubble} alt="Info Bubble" />
              <BubbleContent>
                <BubbleTitle>필기 발표일</BubbleTitle>
                <BubbleText>
                  {certData.written?.resultDate || "날짜 미정"}
                </BubbleText>
              </BubbleContent>
            </BubbleWrapper>
            <BubbleWrapper>
              <BubbleImage src={InfoBubble} alt="Info Bubble" />
              <BubbleContent>
                <BubbleTitle>실기 발표일</BubbleTitle>
                <BubbleText>
                  {certData.practical?.resultDate || "날짜 미정"}
                </BubbleText>
              </BubbleContent>
            </BubbleWrapper>
          </BubbleRow>
        </BubbleContainer>
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