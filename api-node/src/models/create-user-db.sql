CREATE DATABASE NAME_DATABASE;

USE NAME_DATABASE;

CREATE TABLE `user`
(
  `id`            INT(11) NOT NULL auto_increment ,
  `name`          VARCHAR(255) NOT NULL ,
  `birth`         DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `photo`         VARCHAR(255) ,
  `created_at`    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `updated_at`    DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`)
)