# Graduation_Products
유한대학교 3학년 1반 졸작 1조 유자


.env

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=yuza
JWT_SECRET=AJfrpp5mG2jcJZCZfKFOsOsr4mnTLbFIMEUZEoWnm0YQKHYvdK9HVr2SmHf8vCEs



INSERT INTO user_information (user_id, user_password, user_name, user_grade)
VALUES ('테스트 유저', 'root', '테스트 유저', '관리자');

INSERT INTO major_information (major_id, department_name, major_name) VALUES
(101, '공학부', '기계시스템전공'),
(102, '공학부', '소방설비안전전공'),
(103, '공학부', '전기공학전공'),
(104, '공학부', '전자공학전공'),
(105, '공학부', '컴퓨터소프트웨어전공'),
(106, '공학부', '게임콘텐츠전공'),
(107, '공학부', '인공지능전공'),
(201, '디자인문화학부', '산업디자인전공'),
(202, '디자인문화학부', '시각디자인전공'),
(203, '디자인문화학부', '패션디자인전공'),
(204, '디자인문화학부', '실내건축전공'),
(205, '디자인문화학부', '광고미디어전공'),
(206, '디자인문화학부', '방송영상전공'),
(207, '디자인문화학부', '애니메이션웹툰전공'),
(208, '디자인문화학부', '방송문예창작전공'),
(209, '디자인문화학부', '방송연예전공'),
(301, '건강보건학부', '식품영양학과'),
(302, '건강보건학부', '보건의료행정학과'),
(303, '건강보건학부', '작업치료과'),
(304, '건강보건학부', '반려동물보건학과'),
(305, '건강보건학부', '응급구조과'),
(401, '건강생활학부', '유한바이오제약전공'),
(402, '건강생활학부', '유한생명화공전공'),
(403, '건강생활학부', '피부메이크업전공'),
(404, '건강생활학부', '뷰티화장품전공'),
(405, '건강생활학부', '사회복지전공'),
(406, '건강생활학부', '스포츠재활전공'),
(407, '건강생활학부', '반려동물산업전공'),
(408, '건강생활학부', '호텔조리전공'),
(409, '건강생활학부', '카페베이커리전공'),
(501, '비즈니스학부', '호텔관광전공'),
(502, '비즈니스학부', '일본비즈니스전공'),
(503, '비즈니스학부', '경영정보전공'),
(504, '비즈니스학부', '세무회계전공'),
(505, '비즈니스학부', '항공서비스학과');

INSERT INTO certificate_information (certificate_id, major_id, certificate_name, certificate_detail) VALUES 
(1, 205, '정보처리기사', '정보시스템의 생명주기 전반에 걸친 프로세스를 이해하고 수행하는 업무를 담당하는 직무로서 정보시스템 개발 요구사항 분석, 시스템 설계, 시스템 구축 등의 업무를 수행합니다.');

INSERT INTO question_post (question_post_id, user_id, certificate_id, question_title) 
VALUES (1, '테스트 유저', 1, '정보처리기사 문제 예제');

INSERT INTO question_information (question_id, question_post_id, question_content, question_answer1, question_answer2, question_answer3, question_answer4, question_answer, question_explanation, question_tag) VALUES (1, 1, '다음 중 데이터베이스의 트랜잭션(Transaction) 특성인 ACID에 대한 설명으로 올바르지 않은 것은?', '1. Atomicity(원자성): 트랜잭션의 연산은 데이터베이스에 모두 반영되거나 전혀 반영되지 않아야 한다.', '2. Consistency(일관성): 트랜잭션이 실행되기 전의 데이터베이스 내용이 잘못되어 있지 않다면, 트랜잭션이 실행된 이후에도 데이터베이스의 내용에 잘못이 있으면 안 된다.', '3. Isolation(격리성): 트랜잭션이 실행 중에 생성하는 연산의 중간 결과는 반드시 다른 트랜잭션이 접근할 수 있어야 한다.', '4. Durability(영속성): 트랜잭션이 성공적으로 완료되면 그 결과가 영구적으로 데이터베이스에 저장된다.', 3, '트랜잭션의 격리성(Isolation)은 실제로 "트랜잭션이 실행 중에 생성하는 연산의 중간 결과는 다른 트랜잭션이 접근할 수 없어야 한다"가 올바른 설명입니다.', '정보처리');

INSERT INTO question_options (options_id, question_id, options_num, options_content, is_correct) VALUES 
(1, 1, 1, '정보통신망 이용촉진 및 정보보호법', 1),
(2, 1, 2, '정보보호법', 0),
(3, 1, 3, '정보통신법', 0),
(4, 2, 1, '사용자 요구사항 도출', 1),
(5, 2, 2, '시스템 설계', 0),
(6, 2, 3, '코드 작성', 0),
(7, 3, 1, '데이터 중복 최소화', 1),
(8, 3, 2, '데이터 저장 용량 감소', 0),
(9, 3, 3, '보안 강화', 0);
