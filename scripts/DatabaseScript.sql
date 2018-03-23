drop database nursing_database;
drop database banner_database;

CREATE SCHEMA IF NOT EXISTS nursing_database;
use nursing_database;

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
       (2, 'lead'),
	   (3, 'faculty'),
       (4, 'student');

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
VALUES  (0, '11', 'dummy@ulm', 1, null),
		(10000001, '11', 'admin1@ulm', 1, null),
		(20000006, '26', 'faculty1@ulm', 2, null),
        (20000007, '27', 'faculty1@ulm', 2, null),
		(20000001, '21', 'faculty1@ulm', 3, null),
		(20000002, '22', 'faculty2@ulm', 3, null),
		(20000003, '23', 'faculty3@ulm', 3, null),
		(20000004, '24', 'faculty4@ulm', 3, null),
		(20000005, '25', 'faculty5@ulm', 3, null),
		(30000001, '31', 'student1@war', 4, 1),
		(30000002, '32', 'student2@war', 4, 2),
		(30000003, '33', 'student3@war', 4, 3),
		(30000004, '34', 'student4@war', 4, 4),
		(30000005, '35', 'student5@war', 4, 5);

CREATE TABLE IF NOT EXISTS `nursing_database`.`room_capabilities` (
  CAPABILITY   VARCHAR(20),
  CONSTRAINT PK_CAPABILITY PRIMARY KEY (CAPABILITY)
);

CREATE TABLE IF NOT EXISTS `nursing_database`.`room` (
  ROOM_ID   	VARCHAR(10)         NOT NULL,
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

        ('105', 55, 'room6', 'nursing', null, null),
		
		('clinical', 999, null, 'off-campus', null, null );
        

CREATE TABLE IF NOT EXISTS `nursing_database`.`conflict` (
  CONFLICT_ID	VARCHAR (36)	    NOT NULL,
  MESSAGE   VARCHAR(250) NOT NULL,
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
  ROOM_ID    	  VARCHAR(10)      	   NOT NULL,
  START_TIME 	  DATETIME   	   NOT NULL,
  END_TIME   	  DATETIME         NOT NULL,
  SCHEDULE_ID 	  VARCHAR(10)			   ,
  BOOKING_ID 	  VARCHAR(36)	   NOT NULL,
  BOOKING_TITLE   VARCHAR(50)      NOT NULL,               # BOOKING_TITLE INSTEAD OF EVENT TITLE
  DETAILS         VARCHAR(50)			   , 
  CONSTRAINT PK_BOOKING PRIMARY KEY (BOOKING_ID),
  FOREIGN KEY (ROOM_ID) REFERENCES room(ROOM_ID),
  FOREIGN KEY (SCHEDULE_ID) REFERENCES schedule(SCHEDULE_ID)
);

CREATE TABLE IF NOT EXISTS `nursing_database`.`event_section` (
  BOOKING_ID 	  VARCHAR(36)		  NOT NULL,
  SECTION_ID 	  VARCHAR(5)	  NOT NULL,
  NOTES			  VARCHAR(250),
  CONSTRAINT PK_BOOKING_SECTION PRIMARY KEY (BOOKING_ID, SECTION_ID),
  FOREIGN KEY (BOOKING_ID) REFERENCES booking(BOOKING_ID),
  FOREIGN KEY (SECTION_ID) REFERENCES section(SECTION_ID)
);
 
INSERT INTO nursing_database.booking 
VALUES 	
	(100, '2018-03-02 11:00:00', '2018-03-02 12:00:00', 'SPRING2018', 1, 'classroom meeting', null),

	(101, '2018-03-03 11:00:00', '2018-03-03 01:00:00', 'SPRING2018', 2, 'classroom meeting', null),

	(102, '2018-03-18 11:00:00', '2018-03-18 12:00:00', 'SPRING2018', 3, 'classroom meeting', null),

	(103, '2018-03-19 11:00:00', '2018-03-19 12:00:00', 'SPRING2018', 4, 'classroom meeting', null),

	(104, '2018-03-20 11:00:00', '2018-03-20 12:00:00', 'SPRING2018', 5, 'classroom meeting', null);


insert into event_section values
(1,40303, NULL),
(2,41111, NULL),
(3,41422, NULL),
(3,43928, NULL),
(4,43940, NULL);


CREATE TABLE IF NOT EXISTS `nursing_database`.`conflict_event` (
  CONFLICT_ID       VARCHAR(3)     NOT NULL,
  BOOKING_ID        VARCHAR(36)     NOT NULL,
  USER_ID			int(8),
  PRIMARY KEY (CONFLICT_ID, BOOKING_ID),
  FOREIGN KEY (CONFLICT_ID) REFERENCES conflict(CONFLICT_ID),
  FOREIGN KEY (USER_ID) REFERENCES users(USER_ID),
  FOREIGN KEY (BOOKING_ID) REFERENCES booking(BOOKING_ID)
);

CREATE TABLE IF NOT EXISTS `nursing_database`.`leads_course` (
  COURSE_ID 	VARCHAR(5) 	NOT NULL,
  USER_ID       INT(8)         NOT NULL,
  PRIMARY KEY (COURSE_ID, USER_ID),
  FOREIGN KEY (COURSE_ID) REFERENCES course(COURSE_ID),
  FOREIGN KEY (USER_ID) REFERENCES users(USER_ID)
);

CREATE SCHEMA IF NOT EXISTS banner_database;

use banner_database;

CREATE TABLE IF NOT EXISTS `banner_database`.`users` (
  USER_ID	VARCHAR(8) 		NOT NULL,
  FIRSTNAME	VARCHAR(20) 	NOT NULL,
  LASTNAME	VARCHAR(20) 	NOT NULL,
  PRIMARY KEY (USER_ID)
);

INSERT INTO users
VALUES 
	   (10000001, 'Dr', 'Pevito'),
	   (20000001, 'Dennis', 'Demenace'),
       (20000002, 'Jim', 'Bob'), 
       (20000003, 'Joe', 'Bob'),
       (20000004, 'Katty', 'Necklace'),
       (20000005, 'Johnny', 'Flash'),
	   (30000001, 'Judy', 'Summers'),
       (30000002, 'Cash', 'Ameir'),
       (30000003, 'Jolly', 'Fellows'),
       (30000004, 'Hideo', 'Kojima');

CREATE TABLE IF NOT EXISTS `banner_database`.`student_takes` (
  USER_ID	VARCHAR(8) 	NOT NULL,
  SECTION_ID    VARCHAR(5)      NOT NULL,
  PRIMARY KEY (USER_ID, SECTION_ID),
  FOREIGN KEY (USER_ID) REFERENCES users(USER_ID)
);

CREATE TABLE IF NOT EXISTS `banner_database`.`teacher_teaches` (
  USER_ID	VARCHAR(8) 	NOT NULL,
  SECTION_ID    VARCHAR(5)      NOT NULL,
  PRIMARY KEY (USER_ID, SECTION_ID),
  FOREIGN KEY (USER_ID) REFERENCES users(USER_ID)
);

INSERT INTO `banner_database`.`teacher_teaches`
VALUES (20000001, '40303'),
       (20000002, '43928'), 
       (20000003, '41422'),
       (20000004, '43942'),
       (20000005, '44196'),
       (20000005, '43940');
       
INSERT INTO `banner_database`.`student_takes`
VALUES (30000001, '40303'),
       (30000001, '43928'),
       (30000001, '41422'),
       (30000002, '43942'),
       (30000003, '41111'),
       (30000004, '44196');