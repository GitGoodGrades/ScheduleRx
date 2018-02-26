

CREATE TABLE IF NOT EXISTS `nursing_database`.`course` (
  COURSE_ID 	VARCHAR(5) 	NOT NULL,
  COURSE_TITLE 	VARCHAR(80) NOT NULL,
  SEMESTER_ID  	INT(1)		NOT NULL,
  PRIMARY KEY (COURSE_ID)
);

CREATE TABLE IF NOT EXISTS `nursing_database`.`semester` (
  SEMESTER_ID INT(1)	NOT NULL,
  PRIMARY KEY (SEMESTER_ID)
);

INSERT INTO nursing_database.semester 
VALUES 
	(1),
    (2),
    (3),
    (4),
    (5);


CREATE TABLE IF NOT EXISTS `nursing_database`.`room` (
  ROOM_ID   INT         NOT NULL AUTO_INCREMENT,
  CAPACITY  INT         NOT NULL,
  ROOM_NAME VARCHAR(10),
  LOCATION  VARCHAR(15),
  DESCRIPTION  VARCHAR(25),
  PRIMARY KEY (ROOM_ID)
);

CREATE TABLE IF NOT EXISTS `nursing_database`.`section` (
  SECTION_ID 	VARCHAR(5)	NOT NULL,
  COURSE_ID 	VARCHAR(5) 	NOT NULL,
  NUM_STUDENTS	INT			NOT NULL,	
  PRIMARY KEY (SECTION_ID),
  FOREIGN KEY (COURSE_ID) REFERENCES course(COURSE_ID)
);

CREATE TABLE IF NOT EXISTS `nursing_database`.`roles` (
  ROLE_ID		  INT(1) 			 NOT NULL,
  ROLE_NAME       VARCHAR(20)        NOT NULL,
  CONSTRAINT PK_ROLES PRIMARY KEY (ROLE_ID)
);

CREATE TABLE IF NOT EXISTS `nursing_database`.`users` (
  USER_ID       INT(10)         NOT NULL,
  USER_PASSWORD  VARCHAR(10)    NOT NULL,
  EMAIL                 VARCHAR(30)     NOT NULL,
  ROLE_ID        INT(1)   NOT NULL,
  CONSTRAINT PK_USER_ID PRIMARY KEY (USER_ID),
  FOREIGN KEY (ROLE_ID) REFERENCES ROLES(ROLE_ID)
);



/**CREATE TABLE IF NOT EXISTS `nursing_database`.`section_instructors` (
  SECTION_ID 	VARCHAR(5)	NOT NULL,
  INSTUCTOR_ID  INT(10)		NOT NULL,
  CONSTRAINT PK_section_instructors PRIMARY KEY (SECTION_ID, INSTRUCTOR_ID),
  FOREIGN KEY (SECTION_ID) REFERENCES section(SECTION_ID),
  FOREIGN KEY (INSTRUCTOR_ID) REFERENCES users(USER_ID)
);**/



CREATE TABLE IF NOT EXISTS `nursing_database`.`schedule` (
  SCHEDULE_ID 	VARCHAR(10) NOT NULL,
  START_REG_DATE DATETIME NOT NULL,
  END_REG_DATE DATETIME NOT NULL,
  START_SEM_DATE DATETIME NOT NULL,
  END_SEM_DATE DATETIME NOT NULL,
  IS_ARCHIVED BOOLEAN NOT NULL,
  IS_RELEASED BOOLEAN NOT NULL,
  PRIMARY KEY (SCHEDULE_ID)
);

CREATE TABLE IF NOT EXISTS `nursing_database`.`booking` (
  ROOM_ID    	INT      	NOT NULL,
  COURSE_ID  	VARCHAR(5) 	NOT NULL,
  SECTION_ID 	VARCHAR(5)	NOT NULL,
  START_TIME 	DATETIME   	NOT NULL,
  END_TIME   	DATETIME   	NOT NULL,
  SCHEDULE_ID 	VARCHAR(10) NOT NULL,
  BOOKING_ID 	INT 		NOT NULL AUTO_INCREMENT,
  /**USER_ID    	INT(10)    	NOT NULL,**/
  CONSTRAINT PK_BOOKING PRIMARY KEY (BOOKING_ID),
  FOREIGN KEY (ROOM_ID) REFERENCES room(ROOM_ID),
  FOREIGN KEY (COURSE_ID) REFERENCES course(COURSE_ID),
  FOREIGN KEY (SECTION_ID) REFERENCES section(SECTION_ID),
  /**,FOREIGN KEY (USER_ID) REFERENCES users(USER_ID)**/
  FOREIGN KEY (SCHEDULE_ID) REFERENCES schedule(SCHEDULE_ID)
);


INSERT INTO nursing_database.roles 
VALUES (1, 'administrator'),
	   (2, 'faculty'),
       (3, 'student');

INSERT INTO nursing_database.course 

VALUES 	('N2000', 'Nursing Concepts', 1),

	('N2002', 'Transitions In Nursing', 1),
        
	('N2004', 'Health Assessment', 1),
        
	('N2009', 'Fundamentals of Professional Nursing Practice', 1),

	('N3009', 'Adult Health Nursing 1', 2),
    
    ('N3010', 'Mental Health Nursing', 2),
     
	('N3011', 'Nursing Synthesis 1', 2),
    
    ('N3028', 'Adult Health Nursing 2', 3),
    
    ('N4000', 'Adult Health Nursing 3', 4),
    
    ('N4066', 'Nursing Management', 5);

        

INSERT INTO nursing_database.room 

VALUES 	('100', 50, 'room1', 'nursing', ''),

	('101', 51, 'room2', 'nursing', ''),

        ('102', 70, 'room3', 'nursing', ''),

        ('103', 53, 'room4', 'nursing', ''),

        ('104', 54, 'room5', 'nursing', ''),

        ('105', 55, 'room6', 'nursing', '');
        
INSERT INTO nursing_database.section
VALUES 
	('43928', 'N2004', 11),
    ('41422', 'N2004', 2),
    ('43942', 'N3011', 69),
    ('44196', 'N4000', 9),
    ('43940', 'N3010', 12);

INSERT INTO nursing_database.schedule
VALUES ('FALL2018', '2018-07-01 08:00:00', '2018-08-01 23:59:00', '2018-08-15 08:00:00', '2018-12-05 16:00:00', FALSE, FALSE);
	
    

INSERT INTO nursing_database.booking 
(ROOM_ID, COURSE_ID, SECTION_ID, START_TIME, END_TIME, SCHEDULE_ID)
VALUES 	
	('100', 'N2004', '43928', '2018-02-02 11:00:00', '2018-02-02 12:00:00', 'FALL2018'),

	('101', 'N2004', '41422', '2018-02-03 11:00:00', '2018-02-03 01:00:00', 'FALL2018'),

        ('102', 'N3011', '43942', '2018-02-18 11:00:00', '2018-02-18 12:00:00', 'FALL2018'),

        ('103', 'N4000', '44196', '2018-02-19 11:00:00', '2018-02-19 12:00:00', 'FALL2018'),

        ('104', 'N3010', '43940', '2018-02-20 11:00:00', '2018-02-20 12:00:00', 'FALL2018');
        

