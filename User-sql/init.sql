CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(225) NOT NULL,
  `username` varchar(225) NOT NULL,
  PRIMARY KEY (`id`)
);