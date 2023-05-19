CREATE DATABASE book_system
    DEFAULT CHARATCER SET 'utf8mb4';

CREATE TABLE Book(
    Id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    BookName VARCHAR(256) COMMENT 'Book Name',
    Author VARCHAR(256) COMMENT 'Author',
    TypeName VARCHAR(64) COMMENT 'Type Name',
    CreateTime DATETIME COMMENT 'Create Time',
    UpdateTime DATETIME COMMENT 'Update Time',
    Remarks VARCHAR(512) COMMENT 'Remarks'
) DEFAULT CHARSET UTF8 COMMENT '';


CREATE TABLE `user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  `role` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`)
);
ALTER TABLE `user` RENAME TO `User`;
INSERT INTO User(id, username, password, role) 
VALUES ('1','admin','1','1') 

SELECT * FROM User

INSERT INTO Book(BookName, Author, TypeName, Remarks) 
VALUES ('活着','余华','小说','文学经典') 

INSERT INTO Book(BookName, Author, TypeName, Remarks) 
VALUES ('狂人日记','鲁迅','小说','中国第一篇白文话小说') 