-- create table users(
--    firstName text NOT NULL,
--    lastName text NOT NULL
--    email text NOT NULL,
--    password text NOT NULL,
--    permissionlevel text NOT NULL
-- );

CREATE TABLE Users (
--   userId INT NOT NULL,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  email VARCHAR(80) NOT NULL,
  password CHAR(41) NOT NULL,
  permissionLevel INT,
  PRIMARY KEY (email)
);

insert into users(firstName, lastName, email, password, permissionLevel) values('Wayne', 'Constantin', 'wayne@theconstantin.net', 'xilften1', '10');