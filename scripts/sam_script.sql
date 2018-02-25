CREATE TABLE IF NOT EXISTS `nursing_database`.`room` (
  ROOM_ID   INT         NOT NULL AUTO_INCREMENT,
  CAPACITY  INT         NOT NULL,
  ROOM_NAME VARCHAR(10),
  LOCATION  VARCHAR(15),
  DESCRIPTION  VARCHAR(25),
  PRIMARY KEY (ROOM_ID)
);

CREATE TABLE IF NOT EXISTS `nursing_database`.`course` (
  COURSE_ID VARCHAR(5) NOT NULL,
  STUDENTS  INT        NOT NULL,
  PRIMARY KEY (COURSE_ID)
);

CREATE TABLE IF NOT EXISTS `nursing_database`.`booking` (
  ROOM_ID      INT      NOT NULL,
  COURSE_ID  VARCHAR(5) NOT NULL,
  START_TIME DATETIME   NOT NULL,
  END_TIME   DATETIME   NOT NULL,
  BOOKING_ID VARCHAR(5) NOT NULL,
  CONSTRAINT PK_BOOKING PRIMARY KEY (BOOKING_ID),
  FOREIGN KEY (ROOM_ID) REFERENCES room(ROOM_ID),
  FOREIGN KEY (COURSE_ID) REFERENCES course(COURSE_ID)
);

CREATE TABLE IF NOT EXISTS `nursing_database`.`users` (
  USER_ID       INT(10)         NOT NULL,
  USER_PASSWORD  VARCHAR(10)    NOT NULL,
  EMAIL                 VARCHAR(30)     NOT NULL,
  ROLE                  VARCHAR(20)     NOT NULL,
  CONSTRAINT PK_USER_ID PRIMARY KEY (USER_ID),
  FOREIGN KEY (ROLE) REFERENCES ROLES(ROLE)
);

CREATE TABLE IF NOT EXISTS `nursing_database`.`roles` (
  ROLE       VARCHAR(20)        NOT NULL,
  CONSTRAINT PK_ROLES PRIMARY KEY (ROLE)
);

CALL add_course_title_col;