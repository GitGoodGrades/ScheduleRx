

CREATE TABLE IF NOT EXISTS `nursing_database`.`semester` (
  SEMESTER_ID INT(1)		NOT NULL,
  PRIMARY KEY (SEMESTER_ID)
);

INSERT INTO nursing_database.semester 
VALUES (1),
       (2),
       (3),
       (4),
       (5);

CREATE TABLE IF NOT EXISTS `nursing_database`.`course` (
  COURSE_ID 	VARCHAR(5) 	NOT NULL,
  COURSE_TITLE 	VARCHAR(80) 	NOT NULL,
  SEMESTER_ID  	INT(1)		NOT NULL,
  CONSTRAINT PK_COURSE_ID PRIMARY KEY (COURSE_ID),
  FOREIGN KEY (SEMESTER_ID) REFERENCES semester(SEMESTER_ID)
);

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

CREATE TABLE IF NOT EXISTS `nursing_database`.`section` (
  SECTION_ID 	VARCHAR(5)	NOT NULL,
  COURSE_ID 	VARCHAR(5) 	NOT NULL,
  NUM_STUDENTS	INT		NOT NULL,	
  PRIMARY KEY (SECTION_ID),
  FOREIGN KEY (COURSE_ID) REFERENCES course(COURSE_ID)
);

INSERT INTO nursing_database.section
VALUES 
    ('40303', 'N2000', 8),
    ('43928', 'N2004', 11),
    ('41422', 'N2004', 2),
    ('43942', 'N3011', 69),
    ('44196', 'N4000', 9),
    ('43940', 'N3010', 12),
    ('41111', 'N3028', 10);

CREATE TABLE IF NOT EXISTS `nursing_database`.`roles` (
  ROLE_ID	INT(1) 	        NOT NULL,
  ROLE_NAME     VARCHAR(20)     NOT NULL,
  CONSTRAINT PK_ROLES PRIMARY KEY (ROLE_ID)
);

INSERT INTO nursing_database.roles 
VALUES (1, 'administrator'),
       (2, 'faculty'),
       (3, 'student');

CREATE TABLE IF NOT EXISTS `nursing_database`.`users` (
  USER_ID        INT(8)         NOT NULL,      #Campuswide ID (CWID)
  USER_PASSWORD  VARCHAR(20)     NOT NULL,
  EMAIL          VARCHAR(40)     NOT NULL,
  ROLE_ID        INT(1)   	 NOT NULL,
  SEMESTER_ID	 INT(1), 
  CONSTRAINT PK_USER_ID PRIMARY KEY (USER_ID),
  FOREIGN KEY (ROLE_ID) REFERENCES roles(ROLE_ID),
  FOREIGN KEY (SEMESTER_ID) REFERENCES semester(SEMESTER_ID)
);

INSERT INTO users
VALUES  (10000001, '11', 'admin1@ulm', 1, null),
	(20000001, '21', 'faculty1@ulm', 2, null),
	(20000002, '22', 'faculty2@ulm', 2, null),
	(20000003, '23', 'faculty3@ulm', 2, null),
	(20000004, '24', 'faculty4@ulm', 2, null),
	(20000005, '25', 'faculty5@ulm', 2, null),
	(30000001, '31', 'student1@war', 3, 1),
	(30000002, '32', 'student2@war', 3, 2),
	(30000003, '33', 'student3@war', 3, 3),
	(30000004, '34', 'student4@war', 3, 4),
	(30000005, '35', 'student5@war', 3, 5);

CREATE TABLE IF NOT EXISTS `nursing_database`.`room_capabilities` (
  CAPABILITY   VARCHAR(20),
  CONSTRAINT PK_CAPABILITY PRIMARY KEY (CAPABILITY)
);

CREATE TABLE IF NOT EXISTS `nursing_database`.`room` (
  ROOM_ID   	INT(3)         NOT NULL,
  CAPACITY  	INT(3)         NOT NULL,
  ROOM_NAME 	VARCHAR(10),
  LOCATION  	VARCHAR(15) NOT NULL,
  CAPABILITY 	VARCHAR(10),
  DESCRIPTION  	VARCHAR(25),
  CONSTRAINT PK_ROOM_ID PRIMARY KEY (ROOM_ID),
  FOREIGN KEY (CAPABILITY) REFERENCES room_capabilities(CAPABILITY)
);

INSERT INTO nursing_database.room 

VALUES 	('100', 50, 'room1', 'nursing', null, null),

	('101', 51, 'room2', 'nursing', null, null),

        ('102', 70, 'room3', 'nursing', null, null),

        ('103', 53, 'room4', 'nursing', null, null),

        ('104', 54, 'room5', 'nursing', null, null),

        ('105', 55, 'room6', 'nursing', null, null);
        

CREATE TABLE IF NOT EXISTS `nursing_database`.`conflict` (
  CONFLICT_ID	INT (3)	    NOT NULL,
  DESCRIPTION   VARCHAR(80) NOT NULL,
  CONSTRAINT PK_CONFLICT_ID PRIMARY KEY (CONFLICT_ID)
);


CREATE TABLE IF NOT EXISTS `nursing_database`.`schedule` (
  SCHEDULE_ID 	    VARCHAR(10)	 NOT NULL,
  START_REG_DATE    DATETIME 	 NOT NULL,
  END_REG_DATE	    DATETIME 	 NOT NULL,
  START_SEM_DATE    DATETIME  	 NOT NULL,
  END_SEM_DATE 	    DATETIME 	 NOT NULL,
  IS_ARCHIVED 	    BOOLEAN 	 NOT NULL,
  IS_RELEASED 	    BOOLEAN 	 NOT NULL,
  CONSTRAINT PK_SCHEDULE_ID PRIMARY KEY (SCHEDULE_ID)
);

INSERT INTO nursing_database.schedule
VALUES ('SPRING2018', 
'2018-07-01 08:00:00', 
'2018-08-01 23:59:00', 
'2018-08-15 08:00:00', 
'2018-12-05 16:00:00', 
FALSE, FALSE);

CREATE TABLE IF NOT EXISTS `nursing_database`.`booking` (
  ROOM_ID    	INT(3)      	NOT NULL,
  COURSE_ID  	VARCHAR(5) 	NOT NULL,
  SECTION_ID 	VARCHAR(5)	NOT NULL,
  
  START_TIME 	DATETIME   	NOT NULL,
  END_TIME   	DATETIME   	NOT NULL,
  
  SCHEDULE_ID 	VARCHAR(10),
  BOOKING_ID 	INT(2)		NOT NULL AUTO_INCREMENT,
  BOOKING_TITLE   VARCHAR(50)     NOT NULL,               # BOOKING_TITLE INSTEAD OF EVENT TITLE

  CONSTRAINT PK_BOOKING PRIMARY KEY (BOOKING_ID),
  FOREIGN KEY (ROOM_ID) REFERENCES room(ROOM_ID),
  FOREIGN KEY (COURSE_ID) REFERENCES course(COURSE_ID),
  FOREIGN KEY (SECTION_ID) REFERENCES section(SECTION_ID),
  FOREIGN KEY (SCHEDULE_ID) REFERENCES schedule(SCHEDULE_ID)
);

INSERT INTO nursing_database.booking 
VALUES 	
	(100, 'N2004', '43928', '2018-03-02 11:00:00', '2018-03-02 12:00:00', 'SPRING2018', 1, 'classroom meeting'),

	(101, 'N2004', '41422', '2018-03-03 11:00:00', '2018-03-03 01:00:00', 'SPRING2018', 2, 'classroom meeting'),

	(102, 'N3011', '43942', '2018-03-18 11:00:00', '2018-03-18 12:00:00', 'SPRING2018', 3, 'classroom meeting'),

	(103, 'N4000', '44196', '2018-03-19 11:00:00', '2018-03-19 12:00:00', 'SPRING2018', 4, 'classroom meeting'),

	(104, 'N3010', '43940', '2018-03-20 11:00:00', '2018-03-20 12:00:00', 'SPRING2018', 5, 'classroom meeting');


CREATE TABLE IF NOT EXISTS `nursing_database`.`conflict_event` (
  CONFLICT_ID       INT(3)     NOT NULL,
  BOOKING_ID        INT(2)     NOT NULL,
  PRIMARY KEY (CONFLICT_ID, BOOKING_ID),
  FOREIGN KEY (CONFLICT_ID) REFERENCES conflict(CONFLICT_ID),
  FOREIGN KEY (BOOKING_ID) REFERENCES booking(BOOKING_ID)
);

use banner_database;

CREATE TABLE IF NOT EXISTS `banner_database`.`student_takes` (
  USER_ID	VARCHAR(8) 	NOT NULL,
  SECTION_ID    VARCHAR(5)      NOT NULL,
  PRIMARY KEY (USER_ID, SECTION_ID)
);

CREATE TABLE IF NOT EXISTS `banner_database`.`teacher_teaches` (
  USER_ID	VARCHAR(8) 	NOT NULL,
  SECTION_ID    VARCHAR(5)      NOT NULL,
  PRIMARY KEY (USER_ID, SECTION_ID)
);


INSERT INTO teacher_teaches
VALUES (20000001, '40303'),
       (20000002, '43928'), 
       (20000003, '41422'),
       (20000004, '43942'),
       (20000005, '44196'),
       (20000005, '43940');
       
INSERT INTO student_takes
VALUES (30000001, '40303'),
       (30000001, '43928'),
       (30000001, '41422'),
       (30000002, '43942'),
       (30000003, '41111'),
       (30000004, '44196');
       