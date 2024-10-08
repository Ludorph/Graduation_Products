SHOW DATABASES;
SHOW TABLES;

CREATE DATABASE yuza;
USE yuza;

CREATE TABLE user_information(
	user_id VARCHAR(20) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_name VARCHAR(15) NOT NULL,
    user_grade VARCHAR(10) NOT NULL,
    point INT NOT NULL DEFAULT 0,
    manager_id VARCHAR(20) UNIQUE,
    CONSTRAINT user_information_PK PRIMARY KEY(user_id)
    );
    
SELECT * FROM user_information;

CREATE TABLE major_information(
	major_id INT NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    major_name VARCHAR(30) NOT NULL,
    CONSTRAINT major_information_PK PRIMARY KEY(major_id)
    );
        
SELECT * FROM major_information;
    
CREATE TABLE certificate_information(
	certificate_id INT NOT NULL,
    major_id INT,
    certificate_name VARCHAR(50) NOT NULL,
    certificate_detail VARCHAR(3000) NOT NULL,
    application_sdate TIMESTAMP,
    application_edate TIMESTAMP,
    exam_sdate TIMESTAMP,
    exam_edate TIMESTAMP,
    certificate_pic MEDIUMBLOB,
    certificate_pic2 MEDIUMBLOB,
    certificate_pic_path VARCHAR(100),
    certificate_pic_path2 VARCHAR(100),
    CONSTRAINT certificate_information_PK PRIMARY KEY(certificate_id),
	FOREIGN KEY (major_id) REFERENCES major_information(major_id)
		ON DELETE SET NULL
		ON UPDATE CASCADE
    );

SELECT * FROM certificate_information;

CREATE TABLE examdata_post(
	examdata_post_id INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(20) NOT NULL,
    examdata_title VARCHAR(100) NOT NULL,
    examdata_content VARCHAR(3000) NOT NULL,
    examdata_views INT NOT NULL DEFAULT 0,
    examdata_likes INT NOT NULL DEFAULT 0,
    examdata_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT examdata_post_PK PRIMARY KEY(examdata_post_id),
    FOREIGN KEY (user_id) REFERENCES user_information(user_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
    );
    
SELECT * FROM examdata_post;

CREATE TABLE examdata_comment(
	examdata_comment_id INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(20) NOT NULL,
    examdata_post_id INT NOT NULL,
    examdata_comment_content VARCHAR(500) NOT NULL,
    examdata_comment_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    examdata_reply BOOLEAN NOT NULL DEFAULT 0,
    CONSTRAINT examdata_comment_PK PRIMARY KEY(examdata_comment_id),
    FOREIGN KEY (user_id) REFERENCES user_information(user_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
	FOREIGN KEY (examdata_post_id) REFERENCES examdata_post(examdata_post_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    );
    
SELECT * FROM examdata_comment;

CREATE TABLE examdata_file(
	examdata_file_id INT NOT NULL AUTO_INCREMENT,
	user_id VARCHAR(20) NOT NULL,
    examdata_post_id INT NOT NULL,
    examdata_file_data LONGBLOB NOT NULL,
    examdata_format VARCHAR(10) NOT NULL,
    examdata_size INT NOT NULL,
    examdata_path VARCHAR(100) NOT NULL,
    examdata_file_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT examdata_file_PK PRIMARY KEY(examdata_file_id),
    FOREIGN KEY (user_id) REFERENCES user_information(user_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
	FOREIGN KEY (examdata_post_id) REFERENCES examdata_post(examdata_post_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    );
    
SELECT * FROM examdata_file;

CREATE TABLE question_post(
	question_post_id INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(20) NOT NULL,
    certificate_id INT NOT NULL,
    question_title VARCHAR(100) NOT NULL,
    question_views INT NOT NULL DEFAULT 0,
    question_likes INT NOT NULL DEFAULT 0,
    question_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT question_post_PK PRIMARY KEY(question_post_id),
    FOREIGN KEY (user_id) REFERENCES user_information(user_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
	FOREIGN KEY (certificate_id) REFERENCES certificate_information(certificate_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
    );
    
SELECT * FROM question_post;
    
CREATE TABLE question_information(
	question_id INT NOT NULL AUTO_INCREMENT,
    question_post_id INT NOT NULL,
    question_content VARCHAR(500) NOT NULL,
    question_explanation VARCHAR(1000),
    question_tag VARCHAR(15),
    solved_count INT NOT NULL DEFAULT 0,
    correct_rate INT NOT NULL DEFAULT 0,
    incorrect_rate INT NOT NULL DEFAULT 0,
    CONSTRAINT question_information_PK PRIMARY KEY(question_id),
	FOREIGN KEY (question_post_id) REFERENCES question_post(question_post_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    );
    
SELECT * FROM question_information;

CREATE TABLE question_options(
	options_id INT NOT NULL AUTO_INCREMENT,
    question_id INT NOT NULL,
    options_num INT NOT NULL,
    options_content VARCHAR(30) NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT 0,
    CONSTRAINT question_options_PK PRIMARY KEY(options_id),
    FOREIGN KEY (question_id) REFERENCES question_information(question_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    );
    
SELECT * FROM question_options;

CREATE TABLE question_wrong(
	question_wrong_id INT NOT NULL,
    user_id VARCHAR(20) NOT NULL,
    question_id INT NOT NULL,
    CONSTRAINT question_wrong_PK PRIMARY KEY(question_wrong_id),
    FOREIGN KEY (user_id) REFERENCES user_information(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
	FOREIGN KEY (question_id) REFERENCES question_information(question_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    );
    
SELECT * FROM question_wrong;

CREATE TABLE question_objection(
	objection_id INT NOT NULL AUTO_INCREMENT,
    question_id INT NOT NULL,
    user_id VARCHAR(20) NOT NULL,
	manager_id VARCHAR(20),
    objection_title VARCHAR(30) NOT NULL,
    objection_content VARCHAR(150) NOT NULL,
    objection_flag BOOLEAN NOT NULL DEFAULT 0,
    objection_date TIMESTAMP,
    CONSTRAINT question_objection_PK PRIMARY KEY(objection_id),
    FOREIGN KEY (question_id) REFERENCES question_information(question_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user_information(user_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
	FOREIGN KEY (manager_id) REFERENCES user_information(manager_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
    );
    
SELECT * FROM question_objection;

CREATE TABLE free_post(
	free_post_id INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(20) NOT NULL,
    free_title VARCHAR(100) NOT NULL,
    free_content VARCHAR(3000) NOT NULL,
    free_views INT NOT NULL DEFAULT 0,
    free_likes INT NOT NULL DEFAULT 0,
    free_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT free_post_PK PRIMARY KEY(free_post_id),
    FOREIGN KEY (user_id) REFERENCES user_information(user_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
    );
    
SELECT * FROM free_post;

CREATE TABLE free_comment(
	free_comment_id INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(20) NOT NULL,
    free_post_id INT NOT NULL,
    free_comment_content VARCHAR(500) NOT NULL,
    free_comment_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    free_reply BOOLEAN NOT NULL DEFAULT 0,
    CONSTRAINT free_comment_PK PRIMARY KEY(free_comment_id),
    FOREIGN KEY (user_id) REFERENCES user_information(user_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
	FOREIGN KEY (free_post_id) REFERENCES free_post(free_post_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    );
    
SELECT * FROM free_comment;

CREATE TABLE free_file(
	free_file_id INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(20) NOT NULL,
    free_post_id INT NOT NULL,
    free_file_data LONGBLOB NOT NULL,
    free_format VARCHAR(10) NOT NULL,
    free_size INT NOT NULL,
    free_path VARCHAR(100) NOT NULL,
    free_file_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT free_file_PK PRIMARY KEY(free_file_id),
    FOREIGN KEY (user_id) REFERENCES user_information(user_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
	FOREIGN KEY (free_post_id) REFERENCES free_post(free_post_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    );
    
SELECT * FROM free_file;

SELECT * FROM user_information;
SELECT * FROM major_information;
SELECT * FROM certificate_information;
SELECT * FROM examdata_post;
SELECT * FROM examdata_comment;
SELECT * FROM examdata_file;
SELECT * FROM question_post;
SELECT * FROM question_information;
SELECT * FROM question_options;
SELECT * FROM question_wrong;
SELECT * FROM question_objection;
SELECT * FROM free_post;
SELECT * FROM free_comment;
SELECT * FROM free_file;



DROP DATABASE yuza;