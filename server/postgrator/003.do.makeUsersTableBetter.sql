DROP TABLE IF EXISTS "users";

CREATE TABLE Users (
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  email VARCHAR(80) NOT NULL,
  hash CHAR(200) NOT NULL,
  permissionLevel INT,
  PRIMARY KEY (email)
);

-- insert into users(firstName, lastName, email, hash, permissionLevel) values('Wayne', 'Constantin', 'wayne@theconstantin.net', 'xilften1', '10');