export const getCertificationEvents = (certifications) => {
  const parseDate = (dateString) => {
    try {
      // 24.07.29 이런 형식으로 입력하기 위한 setting
      const [year, month, day] = dateString.split('.');
      const date = new Date(`20${year}-${month}-${day}`);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
      return date;
    } catch (error) {
      console.error(`Error parsing date: ${dateString}`, error);
      return null; // 또는 기본 날짜 반환
    }
  };

    return certifications.flatMap(cert => [
      {
        title: `${cert.name} 필기`,
        start: parseDate(cert.signUpPeriod.split(' ~ ')[0]),
        end: parseDate(cert.signUpPeriod.split(' ~ ')[1]),
        allDay: true,
        resource: cert
      },
      {
        title: `${cert.name} 실기`,
        start: parseDate(cert.examDate.split(' ~ ')[0]),
        end: parseDate(cert.examDate.split(' ~ ')[1]),
        allDay: true,
        resource: cert
      }
      // 필요에 따라 발표일정 등 추가
    ]);
  };

  // 자격증 정보를 캘린더 이벤트로 변환하는 함수
  /* 

  1. Depart.js 파일에서 이 함수를 import 
  2. Depart.js 컴포넌트 내에서 이 함수를 사용하여 이벤트 데이터를 생성
  3. <CertificationCalendar events={calendarEvents} /> 로 캘린더 객체를 생성하는 동시에 events props 전달
  4. CertificationCalendar.js 컴포넌트에서 이 이벤트 데이터를 사용합니다:
  
  
  
  */