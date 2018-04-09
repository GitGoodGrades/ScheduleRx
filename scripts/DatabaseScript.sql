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
		('N2011', 'sem 1 course ', 1),
		('N2013', 'sem 1 course ', 1),
		('N3009', 'Adult Health Nursing 1', 2),
		('N3010', 'Mental Health Nursing', 2),
		('N3011', 'Nursing Synthesis 1', 2),
		('N3028', 'Adult Health Nursing 2', 3),
		('N3029', 'sem 3 course ', 3),
		('N3030', 'sem 3 course ', 3),
		('N4000', 'Adult Health Nursing 3', 4),
		('N4001', 'sem 5 course ', 4),
		('N4002', 'sem 4 course ', 4),
		('N4066', 'Nursing Management', 5),
		('N4067', 'sem 5 course ', 5);

CREATE TABLE IF NOT EXISTS `nursing_database`.`section` (
  SECTION_ID 	VARCHAR(5)	NOT NULL,
  COURSE_ID 	VARCHAR(5) 	NOT NULL,
  NUM_STUDENTS	INT		NOT NULL,	
  PRIMARY KEY (SECTION_ID),
  FOREIGN KEY (COURSE_ID) REFERENCES course(COURSE_ID)
);

INSERT INTO nursing_database.section
VALUES ('40011', 'N2000', 8),
    ('40012', 'N2002', 43),
    ('40013', 'N2002', 32),
    ('40014', 'N2002', 28),
    ('40015', 'N2004', 11),
    ('40016', 'N2004', 4),
    ('40021', 'N2009', 30),
    ('40022', 'N2009', 28),
    ('40023', 'N3010', 25),
    ('40024', 'N3010', 12),
    ('40025', 'N3011', 69),
    ('40026', 'N3011', 23),
    ('40031', 'N3028', 10),
    ('40032', 'N3028', 22),
    ('40033', 'N3029', 22),
    ('40034', 'N3029', 22),
    ('40035', 'N3030', 22),
    ('40036', 'N3030', 22),
    ('40041', 'N4000', 9),
    ('40042', 'N4000', 20),
    ('40043', 'N4001', 20),
    ('40044', 'N4001', 20),
    ('40045', 'N4002', 20),
    ('40046', 'N4002', 20),
    ('40051', 'N4066', 50),
    ('40052', 'N4066', 22),
    ('40053', 'N4067', 25);
    

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
        (30000000, '30', 'student0@ulm', 4, 1),
		(30000001, '31', 'student1@war', 4, 1),
		(30000002, '32', 'student2@war', 4, 1),
		(30000003, '33', 'student3@war', 4, 2),
		(30000004, '34', 'student4@war', 4, 2),
		(30000005, '35', 'student5@war', 4, 3),
        (30000006, '36', 'student6@war', 4, 3),
		(30000007, '37', 'student7@war', 4, 3),
        (30000008, '38', 'student8@war', 4, 4),
		(30000009, '39', 'student9@war', 4, 4),
		(30000010, '310', 'student10@war', 4, 4),
		(30000011, '311', 'student11@war', 4, 5),
		(30000012, '312', 'student12@war', 4, 5),
        (30000013, '313', 'student13@war', 4, 5);

CREATE TABLE IF NOT EXISTS `nursing_database`.`capabilities` (
  CAPABILITY_ID INT(4),
  CAPABILITY    VARCHAR(25),
  CONSTRAINT PK_CAPABILITY_ID PRIMARY KEY (CAPABILITY_ID)
);


CREATE TABLE IF NOT EXISTS `nursing_database`.`room` (
  ROOM_ID   	VARCHAR(10)         NOT NULL,
  CAPACITY  	INT(3)         NOT NULL,
  ROOM_NAME 	VARCHAR(10),
  LOCATION  	VARCHAR(15) NOT NULL,
  DESCRIPTION  	VARCHAR(25),
  CONSTRAINT PK_ROOM_ID PRIMARY KEY (ROOM_ID)
);

CREATE TABLE IF NOT EXISTS `nursing_database`.`room_capabilities` (
  ROOM_ID 		VARCHAR(10),
  CAPABILITY_ID INT(4),
  FOREIGN KEY (CAPABILITY_ID) REFERENCES capabilities(CAPABILITY_ID),
  FOREIGN KEY (ROOM_ID) REFERENCES room(ROOM_ID)
);


INSERT INTO nursing_database.capabilities
VALUES  (1,'LRC testing'),
		(2,'computer'),
		(3,'A/V equipment'),
        (4, 'hospital beds'),
		(5, 'NOEL Simulator'),
        (6, 'ICU Simulator');



INSERT INTO nursing_database.room 

VALUES 	('100', 300, 'Auditorium', 'nursing', null),
		('236a', 70, 'LRCa', 'nursing', null),
        ('236b', 70, 'LRCb', 'nursing', null),
        ('236c', 70, 'LRCc', 'nursing', null),
        ('218', 55, null, 'nursing', 'classroom'),
        ('221', 55, null, 'nursing', 'classroom'),
        ('320', 10, null, 'nursing', 'lab'),
        ('327', 10, null, 'nursing', 'lab'),
        ('325', 20, null, 'nursing', 'lab'),
        ('242', 55, null, 'nursing', 'classroom'),
        ('322', 77, null, 'nursing', null),
        ('338', 73, null, 'nursing', null),
        ('339', 73, null, 'nursing', null),
        ('340', 54, null, 'nursing', null),
        ('341', 54, null, 'nursing', null),
        ('215', 10, null, 'nursing', null),
        ('243', 10, null, 'nursing', null),
        ('343', 10, null, 'nursing', 'classroom'),
		('clinical', 999, null, 'off-campus', null );
        
INSERT INTO nursing_database.room_capabilities
VALUES	('236a', 1),
		('236b', 1),
		('236c', 1),
		('218', 2),
		('218', 3),
		('221', 2),
		('221', 3),
		('325', 4),
		('242', 2),
		('242', 3),
		('215', 5),
        ('243', 6);
        

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
'2018-04-02 08:00:00', 
'2018-04-05 23:59:00', 
'2018-04-09 08:00:00', 
'2018-05-12 16:00:00', 
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
    
	('242', 	 '2018-04-09 09:00:00', '2018-04-09 11:00:00', 'SPRING2018','30d4ae64-a33b-4a18-b139-96a47ec2fa0e' ,'40031', null),
	('100', 	 '2018-04-09 09:00:00', '2018-04-09 12:00:00', 'SPRING2018','d018c473-7745-442d-9091-b5adf4c7a3fa' ,'40052', null),
	('242', 	 '2018-04-10 06:00:00', '2018-04-10 13:00:00', 'SPRING2018','2ad1a063-d7c9-49d7-9109-e3122c4408ce' ,'40011', null),
	('clinical', '2018-04-10 06:00:00', '2018-04-10 13:00:00', 'SPRING2018','5dfb9391-daea-4ecb-b3bd-4c31ec2cc0f5' ,'40022', null),
	('clinical', '2018-04-10 06:00:00', '2018-04-10 13:00:00', 'SPRING2018','619a9ca2-b46e-4a55-8d44-e414103f4a02' ,'40033', null),
	('clinical', '2018-04-10 06:00:00', '2018-04-10 13:00:00', 'SPRING2018','888d8b94-f556-4b4b-bd03-c376b666ec35' ,'40044', null),
	('clinical', '2018-04-10 06:00:00', '2018-04-10 13:00:00', 'SPRING2018','fa266733-ade3-4db8-ac4e-d3d0b6384456' ,'40053', null),
	('clinical', '2018-04-10 06:00:00', '2018-04-10 13:00:00', 'SPRING2018','7e0189ad-0523-486c-897c-90731e0f79ad' ,'40051', null),
	('clinical', '2018-04-11 06:00:00', '2018-04-11 13:00:00', 'SPRING2018','6b77ffe2-1076-4d85-9fb8-6cbab6228da4' ,'40022', null),
	('clinical', '2018-04-11 06:00:00', '2018-04-11 13:00:00', 'SPRING2018','163cd8e1-9f01-4181-828b-07e116b505ac' ,'40033', null),
	('clinical', '2018-04-11 06:00:00', '2018-04-11 13:00:00', 'SPRING2018','71b3803b-52f5-4b29-9c1d-2c8705666e8d' ,'40044', null),
	('clinical', '2018-04-11 06:00:00', '2018-04-11 13:00:00', 'SPRING2018','03f4c8a5-6519-463c-ac34-0e01b9b7d6aa' ,'40053', null),
	('100', 	 '2018-04-12 08:00:00', '2018-04-12 10:00:00', 'SPRING2018','556d9e83-4874-4275-a0ef-8db93800e822' ,'2000' , null),
	('100', 	 '2018-04-12 10:15:00', '2018-04-12 11:15:00', 'SPRING2018','d48f50f2-30ac-42c8-b434-263c81a288cd' ,'2002' , null), 
	('100', 	 '2018-04-12 13:00:00', '2018-04-12 15:00:00', 'SPRING2018','b7709c3e-464e-457b-9c4e-d2a59d87ba2e' ,'2004' , null),
	('218', 	 '2018-04-12 08:00:00', '2018-04-12 10:00:00', 'SPRING2018','b5c3246e-30fb-4a73-8da5-b116da4539e5' ,'2009' , null),
	('218', 	 '2018-04-12 10:15:00', '2018-04-12 11:15:00', 'SPRING2018','c3a9af97-c38e-49f4-abb9-92484a28f87a' ,'3010' , null), 
	('218', 	 '2018-04-12 13:00:00', '2018-04-12 15:00:00', 'SPRING2018','96be1ca3-eb98-4156-af89-a4b3a44e4fb6' ,'3011' , null),
	('221', 	 '2018-04-12 08:00:00', '2018-04-12 10:00:00', 'SPRING2018','3766b199-4104-48fa-a8c9-7fa093836e79' ,'3028' , null),
	('221', 	 '2018-04-12 10:15:00', '2018-04-12 11:15:00', 'SPRING2018','08955ac7-75db-4955-9e3c-ff318b36e1c3' ,'3029' , null), 
	('221', 	 '2018-04-12 13:00:00', '2018-04-12 15:00:00', 'SPRING2018','0e320aa8-f008-42a2-966a-a643c8cc401b' ,'3030' , null),
	('242', 	 '2018-04-12 08:00:00', '2018-04-12 10:00:00', 'SPRING2018','b782bb0b-6dbe-4420-bced-cf2f823ab736' ,'4000' , null),
	('242', 	 '2018-04-12 10:15:00', '2018-04-12 11:15:00', 'SPRING2018','77055d7e-4288-449c-800a-bb2275c1aa52' ,'4001' , null), 
	('242', 	 '2018-04-12 13:00:00', '2018-04-12 15:00:00', 'SPRING2018','a99c5298-1976-44b0-9825-55433a7e923c' ,'4002' , null),
	('343', 	 '2018-04-12 08:00:00', '2018-04-12 10:00:00', 'SPRING2018','db3a3808-fd4d-4582-b9f3-e741f2a6bc0c' ,'4066' , 'Test#3'),
	('343', 	 '2018-04-12 10:15:00', '2018-04-12 11:15:00', 'SPRING2018','6fbf41b3-d77f-4fb5-b488-2b788e8a550d' ,'4067' , 'Test#3'), 
    ('236a', 	 '2018-04-13 10:15:00', '2018-04-13 12:15:00', 'SPRING2018','8f5d19ef-9eab-47d3-8c2c-b59766a68ae3' ,'4000' , null),
    ('236a', 	 '2018-04-13 08:15:00', '2018-04-13 10:00:00', 'SPRING2018','e19f0092-596b-4b20-a074-81df7f4bbe63' ,'2004' , null),
	('clinical', '2018-04-17 06:00:00', '2018-04-17 13:00:00', 'SPRING2018','6254b7b4-67ee-4591-b4fd-49a2a3f2b795' ,'40022', null),
	('clinical', '2018-04-17 06:00:00', '2018-04-17 13:00:00', 'SPRING2018','16276e37-f2f2-4a4b-92d0-33156bc07017' ,'40033', null),
	('clinical', '2018-04-17 06:00:00', '2018-04-17 13:00:00', 'SPRING2018','785e2dda-1167-407a-8ddc-c13625987253' ,'40044', null),
	('clinical', '2018-04-17 06:00:00', '2018-04-17 13:00:00', 'SPRING2018','8fb222bc-1039-4292-a4db-0614e73a1d70' ,'40053', null),
	('clinical', '2018-04-17 06:00:00', '2018-04-17 13:00:00', 'SPRING2018','5f32c356-fdbb-4fb1-b8a5-ebc8e8493645' ,'40051', null),
	('clinical', '2018-04-18 06:00:00', '2018-04-18 13:00:00', 'SPRING2018','5cfd7872-159a-4203-b8de-4285417cbe56' ,'40022', null),
	('clinical', '2018-04-18 06:00:00', '2018-04-18 13:00:00', 'SPRING2018','9d68441e-fb85-4f19-920d-86a5387ebdfb' ,'40033', null),
	('clinical', '2018-04-18 06:00:00', '2018-04-18 13:00:00', 'SPRING2018','419e1c44-ca2e-4147-b143-bfebf6ff7ed9' ,'40044', null),
	('clinical', '2018-04-18 06:00:00', '2018-04-18 13:00:00', 'SPRING2018','22dcd7db-6583-461e-a613-25b3add44a92' ,'40053', null),
	('100', 	 '2018-04-19 08:00:00', '2018-04-19 10:00:00', 'SPRING2018','fa2edf1e-0087-40fb-ad42-912a5dc7c48c' ,'2000' , null),
	('100', 	 '2018-04-19 10:15:00', '2018-04-19 11:15:00', 'SPRING2018','a680bf16-82e1-41ce-93a7-920b1a5c7f4a' ,'2002' , null), 
	('100', 	 '2018-04-19 13:00:00', '2018-04-19 15:00:00', 'SPRING2018','5323b259-cce5-428a-b193-0b841e2f4b59' ,'2004' , null),
	('218', 	 '2018-04-19 08:00:00', '2018-04-19 10:00:00', 'SPRING2018','4873261b-7004-46f2-a782-c87d2179cc1a' ,'2009' , null),
	('218', 	 '2018-04-19 10:15:00', '2018-04-19 11:15:00', 'SPRING2018','d257d9f0-6397-4ea6-8d73-c8f34903fbcf' ,'3010' , null), 
	('218', 	 '2018-04-19 13:00:00', '2018-04-19 15:00:00', 'SPRING2018','1336b15a-da1e-4af7-845b-9d156f58fd4c' ,'3011' , null),
	('221', 	 '2018-04-19 08:00:00', '2018-04-19 10:00:00', 'SPRING2018','5d844b23-ddeb-4d7a-a371-fa4798c01eae' ,'3028' , null),
	('221', 	 '2018-04-19 10:15:00', '2018-04-19 11:15:00', 'SPRING2018','93c2281e-0011-4cc4-8177-b75e0fa69c9e' ,'3029' , null), 
	('221', 	 '2018-04-19 13:00:00', '2018-04-19 15:00:00', 'SPRING2018','1f3e89a5-0e6a-4bd2-b98d-6cb2eef2b89c' ,'3030' , null),
	('242', 	 '2018-04-19 08:00:00', '2018-04-19 10:00:00', 'SPRING2018','2dd56e48-16f1-4dc9-9132-e12fa50fa81a' ,'4000' , null),
	('242', 	 '2018-04-19 10:15:00', '2018-04-19 11:15:00', 'SPRING2018','bfb01ffe-efe2-4df2-ba36-828941debf93' ,'4001' , null), 
	('242', 	 '2018-04-19 13:00:00', '2018-04-19 15:00:00', 'SPRING2018','37434a8b-dca7-42b9-868d-a29ba15ab0ea' ,'4002' , null),
	('343', 	 '2018-04-19 08:00:00', '2018-04-19 10:00:00', 'SPRING2018','4e54ba6b-479a-4c95-b3d6-2833c041dbc0' ,'4066' , null),
	('343', 	 '2018-04-19 10:15:00', '2018-04-19 11:15:00', 'SPRING2018','c857f805-a4ee-4fed-91be-5795a28a8e17' ,'4067' , null);

INSERT INTO nursing_database.event_section
VALUES
('03f4c8a5-6519-463c-ac34-0e01b9b7d6aa',	40053, null),	
('d018c473-7745-442d-9091-b5adf4c7a3fa',	40052, null),	
('16276e37-f2f2-4a4b-92d0-33156bc07017',	40033, null),	
('163cd8e1-9f01-4181-828b-07e116b505ac',	40033, null),	
('fa266733-ade3-4db8-ac4e-d3d0b6384456',	40053, null),	
('22dcd7db-6583-461e-a613-25b3add44a92',	40053, null),	
('2ad1a063-d7c9-49d7-9109-e3122c4408ce',	40011, null),	
('9d68441e-fb85-4f19-920d-86a5387ebdfb',	40033, null),	
('30d4ae64-a33b-4a18-b139-96a47ec2fa0e',	40031, null),	
('8fb222bc-1039-4292-a4db-0614e73a1d70',	40053, null),	
('419e1c44-ca2e-4147-b143-bfebf6ff7ed9',	40044, null),	
('785e2dda-1167-407a-8ddc-c13625987253',	40044, null),	
('7e0189ad-0523-486c-897c-90731e0f79ad',	40051, null),	
('888d8b94-f556-4b4b-bd03-c376b666ec35',	40044, null),	
('5cfd7872-159a-4203-b8de-4285417cbe56',	40022, null),	
('71b3803b-52f5-4b29-9c1d-2c8705666e8d',	40044, null),	
('5dfb9391-daea-4ecb-b3bd-4c31ec2cc0f5',	40022, null),	
('5f32c356-fdbb-4fb1-b8a5-ebc8e8493645',	40051, null),	
('619a9ca2-b46e-4a55-8d44-e414103f4a02',	40033, null),	
('6254b7b4-67ee-4591-b4fd-49a2a3f2b795',	40022, null),	
('6b77ffe2-1076-4d85-9fb8-6cbab6228da4',	40022, null),	
('6fbf41b3-d77f-4fb5-b488-2b788e8a550d',	40053, null),	
('5d844b23-ddeb-4d7a-a371-fa4798c01eae',	40031, null),	
('5d844b23-ddeb-4d7a-a371-fa4798c01eae',	40032, null),	
('77055d7e-4288-449c-800a-bb2275c1aa52',	40043, null),	
('77055d7e-4288-449c-800a-bb2275c1aa52',	40044, null),
('8f5d19ef-9eab-47d3-8c2c-b59766a68ae3',	40041, null),	
('8f5d19ef-9eab-47d3-8c2c-b59766a68ae3',	40042, null),	
('4873261b-7004-46f2-a782-c87d2179cc1a',	40021, null),
('4873261b-7004-46f2-a782-c87d2179cc1a',	40022, null),	
('4e54ba6b-479a-4c95-b3d6-2833c041dbc0',	40051, null),	
('4e54ba6b-479a-4c95-b3d6-2833c041dbc0',	40052, null),
('5323b259-cce5-428a-b193-0b841e2f4b59',	40015, null),	
('5323b259-cce5-428a-b193-0b841e2f4b59',	40016, null),
('556d9e83-4874-4275-a0ef-8db93800e822',	40011, null),
('93c2281e-0011-4cc4-8177-b75e0fa69c9e',	40033, null),	
('93c2281e-0011-4cc4-8177-b75e0fa69c9e',	40034, null),	
('96be1ca3-eb98-4156-af89-a4b3a44e4fb6',	40025, null),	
('96be1ca3-eb98-4156-af89-a4b3a44e4fb6',	40026, null),	
('37434a8b-dca7-42b9-868d-a29ba15ab0ea',	40045, null),		
('37434a8b-dca7-42b9-868d-a29ba15ab0ea',	40046, null),
('3766b199-4104-48fa-a8c9-7fa093836e79',	40031, null),	
('3766b199-4104-48fa-a8c9-7fa093836e79',	40032, null),
('a680bf16-82e1-41ce-93a7-920b1a5c7f4a',	40012, null),	
('a680bf16-82e1-41ce-93a7-920b1a5c7f4a',	40013, null),
('a680bf16-82e1-41ce-93a7-920b1a5c7f4a',	40014, null),		
('a99c5298-1976-44b0-9825-55433a7e923c',	40046, null),	
('a99c5298-1976-44b0-9825-55433a7e923c',	40045, null),	
('b5c3246e-30fb-4a73-8da5-b116da4539e5',	40021, null),		
('b5c3246e-30fb-4a73-8da5-b116da4539e5',	40022, null),
('b7709c3e-464e-457b-9c4e-d2a59d87ba2e',	40015, null),	
('b7709c3e-464e-457b-9c4e-d2a59d87ba2e',	40016, null),	
('b782bb0b-6dbe-4420-bced-cf2f823ab736',	40041, null),		
('b782bb0b-6dbe-4420-bced-cf2f823ab736',	40042, null),
('bfb01ffe-efe2-4df2-ba36-828941debf93',	40043, null),	
('bfb01ffe-efe2-4df2-ba36-828941debf93',	40044, null),	
('c3a9af97-c38e-49f4-abb9-92484a28f87a',	40023, null),	
('c3a9af97-c38e-49f4-abb9-92484a28f87a',	40024, null),
('c857f805-a4ee-4fed-91be-5795a28a8e17',	40053, null),	
('2dd56e48-16f1-4dc9-9132-e12fa50fa81a',	40041, null),	
('2dd56e48-16f1-4dc9-9132-e12fa50fa81a',	40042, null),
('d257d9f0-6397-4ea6-8d73-c8f34903fbcf',	40023, null),	
('d257d9f0-6397-4ea6-8d73-c8f34903fbcf',	40024, null),	
('d48f50f2-30ac-42c8-b434-263c81a288cd',	40012, null),		
('d48f50f2-30ac-42c8-b434-263c81a288cd',	40013, null),	
('d48f50f2-30ac-42c8-b434-263c81a288cd',	40014, null),
('db3a3808-fd4d-4582-b9f3-e741f2a6bc0c',	40051, null),	
('db3a3808-fd4d-4582-b9f3-e741f2a6bc0c',	40052, null),
('e19f0092-596b-4b20-a074-81df7f4bbe63',	40015, null),
('e19f0092-596b-4b20-a074-81df7f4bbe63',	40016, null),
('fa2edf1e-0087-40fb-ad42-912a5dc7c48c',	40011, null),	
('08955ac7-75db-4955-9e3c-ff318b36e1c3',	40033, null),		
('08955ac7-75db-4955-9e3c-ff318b36e1c3',	40034, null),
('0e320aa8-f008-42a2-966a-a643c8cc401b',	40035, null),	
('0e320aa8-f008-42a2-966a-a643c8cc401b',	40036, null),
('1336b15a-da1e-4af7-845b-9d156f58fd4c',	40025, null),	
('1336b15a-da1e-4af7-845b-9d156f58fd4c',	40026, null),
('1f3e89a5-0e6a-4bd2-b98d-6cb2eef2b89c',	40035, null),
('1f3e89a5-0e6a-4bd2-b98d-6cb2eef2b89c',	40036, null);

CREATE TABLE IF NOT EXISTS `nursing_database`.`conflict_event` (
  CONFLICT_ID       VARCHAR(36)     NOT NULL,
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

INSERT INTO nursing_database.leads_course
VALUES	('N2000', 20000001),
		('N2002', 20000001),
        ('N2004', 20000001);
		
CREATE TABLE IF NOT EXISTS `nursing_database`.`message` (
  MSG_ID 		VARCHAR(36),
  USER_ID 		INT(8),
  MESSAGE		VARCHAR(300),
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
       (20000000, 'Robert', 'Steinman'),
	   (20000001, 'Dennis', 'Demenace'),
       (20000002, 'Jim', 'Bob'), 
       (20000003, 'Joe', 'Bob'),
       (20000004, 'Katty', 'Necklace'),
       (20000005, 'Johnny', 'Flash'),
       (30000000, 'Bobby', 'Bubble'),
	   (30000001, 'Judy', 'Summers'),
       (30000002, 'Cash', 'Ameir'),
       (30000003, 'Jolly', 'Fellows'),
       (30000004, 'Hideo', 'Kojima'),
       (30000005, 'Lon', 'Smith'),
       (30000006, 'Blake', 'Southern'),
       (30000007, 'John', 'Smith'),
       (30000008, 'Tom', 'Jerry'),
       (30000009, 'Sam', 'Bivvers'),
       (30000010, 'Drew', 'Mathis'),
       (30000011, 'Drake', 'Blevin'),
       (30000012, 'Jessica', 'Trudeau'),
       (30000013, 'Donnie', 'Trundle');

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
VALUES  (20000001, '40011'),
		(20000001, '40012'),
		(20000001, '40013'),
		(20000001, '40014'),
		(20000001, '40015'),
		(20000001, '40016'),
		(20000002, '40021'),
		(20000002, '40022'),
		(20000002, '40023'),
		(20000002, '40024'),
		(20000002, '40025'),
		(20000002, '40026'),
		(20000003, '40031'),
		(20000003, '40032'),
		(20000003, '40033'),
		(20000003, '40034'),
		(20000003, '40035'),
		(20000003, '40036'),
		(20000004, '40041'),
		(20000004, '40042'),
		(20000004, '40043'),
		(20000004, '40044'),
		(20000004, '40045'),
		(20000004, '40046'),
		(20000005, '40051'),
		(20000005, '40052'),
		(20000005, '40053');
       
       
INSERT INTO `banner_database`.`student_takes`
VALUES  (30000000, '40011'),
		(30000000, '40012'),
		(30000000, '40015'),
		(30000001, '40011'),
		(30000001, '40013'),
		(30000001, '40016'),
		(30000002, '40011'),
		(30000002, '40014'),
		(30000002, '40015'),
		(30000003, '40021'),
		(30000003, '40023'),
		(30000003, '40025'),
		(30000004, '40022'),
		(30000004, '40024'),
		(30000004, '40026'),
		(30000005, '40031'),
		(30000005, '40033'),
		(30000005, '40036'),
		(30000006, '40031'),
		(30000006, '40034'),
		(30000006, '40035'),
		(30000007, '40032'),
		(30000007, '40033'),
		(30000007, '40035'),
		(30000008, '40041'),
		(30000008, '40043'),
		(30000008, '40046'),
		(30000009, '40041'),
		(30000009, '40044'),
		(30000010, '40042'),
		(30000010, '40043'),
		(30000010, '40045'),
		(30000011, '40051'),
		(30000011, '40053'),
		(30000012, '40051'),
		(30000012, '40053'),
		(30000013, '40052'),
		(30000013, '40053');

