# Graduation_Products
유한대학교 3학년 1반 졸작 1조 유자


.env

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=yuza
JWT_SECRET=AJfrpp5mG2jcJZCZfKFOsOsr4mnTLbFIMEUZEoWnm0YQKHYvdK9HVr2SmHf8vCEs



INSERT INTO user_information (user_id, user_password, user_name, user_grade)
VALUES ('root', 'root', 'root', 'root');

INSERT INTO certificate_information(certificate_id, certificate_name, certificate_detail)
VALUES (1, '정보처리기사', '정보시스템의 생명주기 전반에 걸친 프로세스를 이해하고 수행하는 업무를 담당하는 직무로서 정보시스템 개발 요구사항 분석, 시스템 설계, 시스템 구축 등의 업무를 수행합니다.');

INSERT INTO question_post (question_post_id, user_id, certificate_id, question_title, question_views, question_likes, question_date)
VALUES (1, 'root', 1, '정보처리기사 실기 문제입니다.', 1000, 100, CURDATE()); 

INSERT INTO question_information (question_id, question_post_id, question_content, solved_count, correct_rate, incorrect_rate)
VALUES (1, 1, '다음 중 객체지향 프로그래밍의 특징이 아닌 것은?  <br> 1) 추상화 <br> 2) 캡슐화 <br> 3) 다형성 <br> 4) 일괄처리 답 4', 1, 100, 0);

