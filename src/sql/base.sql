CREATE TABLE IF NOT EXISTS `students` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  doc_number int(11) unique NOT NULL,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  email varchar(255) unique NOT NULL,
  phone varchar(20) unique NOT NULL,
  grade int(11) NOT NULL,
  course varchar(255) NOT NULL,
  score DECIMAL(4, 2) NOT NULL,
  active BOOLEAN DEFAULT true
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `roles` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(255) NOT NULL UNIQUE,
  description varchar (255) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO roles (name, description)
VALUES ('ADMIN', 'The role admin description');

INSERT INTO roles (name, description)
VALUES ('MOD', 'The role moderator description');

INSERT INTO roles (name, description)
VALUES ('VIEWER', 'The role viewer description');

CREATE TABLE IF NOT EXISTS `users`(
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  email varchar(255) NOT NULL UNIQUE,
  pass varchar(255) NOT NULL,
  role_id int(11) NOT NULL,
  FOREIGN KEY (role_id) REFERENCES roles(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO users (email, pass, role_id)
VALUES ('YOUR_EMAIL_HERE', SHA2('YOUR_PASSWORD_HERE', 256), 1);