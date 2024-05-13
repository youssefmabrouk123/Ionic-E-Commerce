-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 08 mai 2024 à 09:07
-- Version du serveur : 8.2.0
-- Version de PHP : 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ecommercemobile`
--

-- --------------------------------------------------------

--
-- Structure de la table `cart_product`
--

DROP TABLE IF EXISTS `cart_product`;
CREATE TABLE IF NOT EXISTS `cart_product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `creation_date` datetime(6) DEFAULT NULL,
  `post_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `numero` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKlelvbe02il5993s3216lj10t1` (`post_id`),
  KEY `FK46vp2quu7cccp3eijdoqhtpka` (`user_id`),
  KEY `FK2kdlr8hs2bwl14u8oop49vrxi` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `cart_product`
--

INSERT INTO `cart_product` (`id`, `creation_date`, `post_id`, `user_id`, `address`, `email`, `name`, `numero`, `product_id`) VALUES
(4, '2024-05-07 22:06:30.537565', 1, 1, NULL, 'user@user.tn', 'user test', NULL, NULL),
(5, '2024-05-07 22:06:30.566087', 2, 1, NULL, 'user@user.tn', 'user test', NULL, NULL),
(6, '2024-05-07 22:10:43.092266', 1, 1, NULL, 'user@user.tn', 'user test', NULL, NULL),
(7, '2024-05-07 22:10:43.099666', 2, 1, NULL, 'user@user.tn', 'user test', NULL, NULL),
(8, '2024-05-07 22:10:43.106626', 3, 1, NULL, 'user@user.tn', 'user test', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description_category` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `description_category`, `name`) VALUES
(1, 'Unlock boundless possibilities with our laptops.', 'Laptop'),
(2, 'Explore endless potential with our mobile devices.', 'Mobiles'),
(3, 'Find your perfect click with our range of mice.', 'Mouse'),
(4, 'Find your typing companion among our keyboards.', 'Keyboard'),
(5, 'Find the future in our array of monitors.', 'Monitors'),
(6, 'Find timeless elegance in our watches.', 'Watch'),
(7, NULL, 'MAC'),
(8, 'Gadgets', 'Gadgets');

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

DROP TABLE IF EXISTS `commande`;
CREATE TABLE IF NOT EXISTS `commande` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `date` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `numero` bigint DEFAULT NULL,
  `number` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `commande`
--

INSERT INTO `commande` (`id`, `address`, `date`, `email`, `name`, `numero`, `number`, `user_id`) VALUES
(1, '123 Main Street', NULL, 'johndoe@example.com', 'John Doe', NULL, NULL, NULL),
(6, '123 Main Street', NULL, 'johndoe@example.com', 'John Doe', NULL, 123456, NULL),
(11, '123 Main Street', '2024-05-08 00:31:38.899051', 'john@example.com', 'John Doe', NULL, 1234567890, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `commande_products`
--

DROP TABLE IF EXISTS `commande_products`;
CREATE TABLE IF NOT EXISTS `commande_products` (
  `commande_id` bigint NOT NULL,
  `products_id_product` bigint NOT NULL,
  `products` varchar(255) DEFAULT NULL,
  UNIQUE KEY `UK_15558u29c4fgq2jjstti7o6j2` (`products_id_product`),
  KEY `FKh90ly5bode63y9iua5083jdbc` (`commande_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `commande_products`
--

INSERT INTO `commande_products` (`commande_id`, `products_id_product`, `products`) VALUES
(11, 1, NULL),
(11, 2, NULL),
(11, 3, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `our_users`
--

DROP TABLE IF EXISTS `our_users`;
CREATE TABLE IF NOT EXISTS `our_users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `account_state` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `age` bigint DEFAULT NULL,
  `birth_date` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `number` bigint DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `our_users`
--

INSERT INTO `our_users` (`id`, `account_state`, `address`, `age`, `birth_date`, `email`, `firstname`, `gender`, `image`, `lastname`, `number`, `password`, `role`) VALUES
(1, 'ACTIVE', NULL, NULL, NULL, 'user@user.tn', 'user', NULL, 'C:\\Users\\arway\\Desktop\\EcommerceMobile\\backend\\profileimage/blob', 'test', NULL, '$2a$10$cwV6G25ZtWMqWtbhsHKOO.wvk2TxPiJ0pKLPQQgLxbBNk2q8GMsbq', 'USER'),
(2, 'ACTIVE', NULL, NULL, NULL, 'seller@user.tn', 'Seller', NULL, NULL, 'Test', NULL, '$2a$10$JkqVSFOGkLvmvcpWooJUl.9bZw9ftQrmPtO10H8vKciUfHNZGxlnS', 'SELLER'),
(4, 'ACTIVE', NULL, NULL, NULL, 'mabrouk@user.tn', 'youssef', NULL, NULL, 'Mabrouk', NULL, '$2a$10$Iltf3eMQIBkIb/MxBKV6y.9WXXqupPZyAsnIpikMmur/KZVoBMnTS', 'SELLER'),
(5, NULL, NULL, NULL, NULL, 'ahmed@user.tn', 'Ahmed', NULL, NULL, 'Tn', NULL, '$2a$10$Tm1xFQ6Df7wSNh.fHOpqd.nieQG99DrobQW6b3A2wBTaG0eOGXx1O', 'USER'),
(6, NULL, NULL, NULL, NULL, 'admin@user.tn', 'Youssef', NULL, NULL, 'mabrouk', NULL, '$2a$10$ZwwOXAW9BAmS7LfGnDKcw.qz/q6MPyGyHRPdKRsDHeTbgMkmWh5mW', 'ADMIN'),
(7, 'ACTIVE', NULL, NULL, NULL, 'sell@user.tn', 'Ahmed', NULL, NULL, 'Ali', NULL, '$2a$10$dW5/JbR6RF7hGwMXn0SZ4ecVkpB6WKs9VI0gw5emr6z/oQm94Orey', 'SELLER'),
(8, 'ACTIVE', NULL, NULL, NULL, 'youss@user.tn', 'Youssef', NULL, NULL, 'Tn', NULL, '$2a$10$J0oUfLfgHtAZS9aCu66CR.V1tq7UeUs94O8jdWnBlhLMA8A/RhrWC', 'SELLER'),
(9, NULL, NULL, NULL, NULL, 'aaa@user.tn', 'aaaa', NULL, NULL, 'aaaa', 123456, '$2a$10$ixmvhYkqxhoFAD6Gimjr7eCFqkVnX2UJrIUbOtAH.kLskIgv7iF8e', 'SELLER'),
(10, NULL, NULL, NULL, NULL, 'aaa@aa.dsd', 'aa', NULL, NULL, 'aaa', 123, '$2a$10$4yGHhhRmjnyAj8Ufx9NZ9eIFf8DpPGK50xro7UFOVP2yzuCNh5fuy', 'SELLER');

-- --------------------------------------------------------

--
-- Structure de la table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id_product` bigint NOT NULL AUTO_INCREMENT,
  `creation_date` datetime(6) DEFAULT NULL,
  `description_product` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name_product` varchar(255) DEFAULT NULL,
  `name_link` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `stock_product` bigint DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id_product`),
  KEY `FK1mtsbur82frn64de7balymq9s` (`category_id`),
  KEY `FKjcy9gjqju1fp7u5sp1thodw9` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `product`
--

INSERT INTO `product` (`id_product`, `creation_date`, `description_product`, `image`, `name_product`, `name_link`, `price`, `stock_product`, `category_id`, `user_id`) VALUES
(1, '2024-05-07 17:12:18.000000', 'Clavier gaming RGB', 'https://www.sbsinformatique.com/6148/tunisie/large/clavier-gamer-semi-mecanique-redragon-centaur-2-k506-1-azerty-tunisie.jpg', 'Clavier X25', NULL, '17.4TND', 25, 4, 2),
(2, '2024-05-07 17:19:15.000000', 'Écran 6,7 OLED Super Retina XDR HDR10, Dolby Vision, 120Hz - Écran toujours actif - Résolution: 2796x1290 pixels - Processeur: Apple A16 bionique (4 nm) Hexa-core (2x3.46 GHz Everest + 4x2.02 GHz Sawtooth) - GPU Graphics App', 'https://mk-media.mytek.tn/media/catalog/product/cache/8be3f98b14227a82112b46963246dfe1/1/_/1_2133.jpg', 'IPhone 14 128Go Violet - APPLE', NULL, '3.425TND', 5, 2, 2),
(3, '2024-05-07 17:25:19.000000', NULL, 'https://www.sbsinformatique.com/2358/tunisie/small/souris-t-dagger-private-tgm106-rgb-tunisie-tunisie.jpg', 'Souris gaming ', NULL, '65.4TND', 16, 3, 2),
(4, '2024-05-07 17:26:19.000000', 'Montre Connectée SAMSUNG Galaxy Watch 6 Classic BT 47 MM - Noir', 'https://mk-media.mytek.tn/media/catalog/product/cache/8be3f98b14227a82112b46963246dfe1/m/o/montre-connectee-samsung-galaxy-watch-6-classic-bt-47-mm-noir.jpg', 'SAMSUNG Galaxy Watch 6', 'https://www.mytek.tn/catalogsearch/result/?q=smartwatch', '1450TND', 23, 6, 2),
(5, '2024-05-07 19:49:39.000000', 'Ecran Gamer - REDRAGON NEAPOLIS 24\" 75HZ', 'https://www.sbsinformatique.com/19167/tunisie/small/ecran-gamer-redragon-neapolis-24-75hz-tunisie.jpg', 'Ecran Gamer', NULL, '240.600TND', 10, 5, 2),
(6, NULL, 'PC PORTABLE GAMER DELL G15 5530 I7 13È GÉN 32GO RTX 4060\r\n', 'https://mk-media.mytek.tn/media/catalog/product/cache/8be3f98b14227a82112b46963246dfe1/p/c/pc-portable-gamer-dell-g15-5530-i7-13e-gen-32go-rtx-4060-a_1.jpg', 'PC PORTABLE GAMER DELL', NULL, '4736TND', 6, 1, 8),
(7, '2024-05-07 20:03:32.000000', 'Écran 13 Retina LED IPS (2560 x 1600 pixels) - Processeur: Apple M1 (2020) (CPU 8 coeurs / GPU 7 coeurs / Neural Engine 16 coeurs) - Système d\'exploitation: MacOS Big Sur - Mémoire RAM: 8 Go DDR4 - Disque Dur: 256 Go SSD avec Wi-Fi, Bluetooth, 2x Thunderb', 'https://mk-media.mytek.tn/media/catalog/product/cache/8be3f98b14227a82112b46963246dfe1/a/p/apple-macbook-air-m1-2020-8go-256go-ssd-gold.jpg', 'APPLE MACBOOK AIR M1 (2020) 8GO 256GO SSD - GOLD\r\n', NULL, '3465TND', 3, 7, 8),
(8, '2024-05-07 20:05:33.000000', 'Disque Dur Externe - Coque Externe en Silicone résistant aux chocs - Capacité: 1 To - Type de Disque: HDD - Format de Disque: 2.5 pouces - Interface: USB 3.2 (rétrocompatible avec USB 2.0) - AES 256 bits - Systéme d\'exploitation Compatible: Windows XP , V', 'https://mk-media.mytek.tn/media/catalog/product/cache/8be3f98b14227a82112b46963246dfe1/6/8/68132_9ns1drim4k8fbl3d_1_1.jpg', 'DISQUE DUR EXTERNE ANTI-CHOC ADATA HD330 1TO USB 3.2 - ROUGE\r\n', '\r\n', '167TND', 14, 8, 8),
(9, '2024-05-07 20:08:27.000000', 'Double SIM - Écran 6.6\" HD+ (720x1612 pixels) - Processeur: Unisoc T603 Octa-core - Systéme d\'exploitation: itel OS 13 - Mémoire RAM: 3 Go(extensible jusqu\'à 8 Go) - Stockage: 64 Go - Appareil Photo Arriére: Dual AI 13MP + 0.08MP, Frontale: 8MP - Connecti', 'https://www.tunisianet.com.tn/362183-large/smartphone-itel-a70-3-go-64-go-gold.jpg', 'ITEL A70 / 3 GO / 64 GO / GOLD', NULL, '270TND', 12, 2, 2),
(11, '2024-05-07 20:13:26.000000', 'Double SIM - Écran 6.8\" AMOLED dynamique 2XDouble SIM - Écran 6.8\" AMOLED dynamique 2X - Résolution: Quad HD+ (3120 x 1440) - Taux de rafraîchissement: 120 Hz - Prise en charge du stylet S - Processeur: Qualcomm Snapdragon 8 Gen 3 Octa-Core - Mémoire: 12 ', 'https://www.tunisianet.com.tn/351707-large/smartphone-samsung-galaxy-s24-ultra-5g-12-go-256-go-gold.jpg', 'SAMSUNG GALAXY S24 ULTRA / 5G / 12 GO / 256 GO / JAUNE', NULL, '5748TND', 17, 2, 4),
(12, '2024-05-07 20:16:41.000000', 'Écran 6,7 OLED Super Retina XDR HDR10, Dolby Vision, 120Hz - Écran toujours actif - Résolution: 2796x1290 pixels - Processeur: Apple A16 bionique (4 nm) Hexa-core (2x3.46 GHz Everest + 4x2.02 GHz Sawtooth) - GPU Graphics Apple 5 Coeurs - Système d\'exploit', 'https://www.tunisianet.com.tn/332978-large/smartphone-apple-iphone-14-pro-5g-128-go-purple.jpg', 'IPHONE 14 PRO MAX 128GO NOIR - APPLE\r\n', NULL, '5798TND', 17, 2, 4),
(14, '2024-05-07 20:21:02.000000', 'Écran 17.3\" FULL HD IPS, 144 Hz \r\nProcesseur: Intel Core i5-12450H (up to 4,40 GHz Turbo max, 12 Mo de mémoire cache, Octa-Core) \r\nSystème d\'exploitation: FreeDos \r\nMémoire RAM: 8 Go DDR5\r\nDisque dur: 512 Go SSD\r\nCarte graphique: NVIDIA GeForce RTX 4050 (', 'https://www.sbsinformatique.com/14868/tunisie/small/pc-portable-gamer-msi-gaming-katana-17-b12vek-419xfr-i5-12450h-rtx-4050-6g-8-go-tunisie.jpg', 'PC Portable Gamer - MSI Gaming KATANA 17 B12VEK-419XFR | I5-12450H | RTX 4050 6G |8 Go\r\n', NULL, '3257TND', 3, 1, 4),
(15, '2024-05-07 20:22:38.000000', 'Ecran AIWA 29.9″ MZ2950-K QHD 165Hz \r\nCurved\r\n2560 x 1440 pixels\r\n165Hz \r\n16/9 \r\nDalle VA \r\nAMD FreeSync \r\nTemps de réponse 1Ms\r\n2x HDMI ', 'https://www.sbsinformatique.com/14082/tunisie/small/ecran-gamer-aiwa-mz2950-k-299-qhd-165hz-curved-tunisie.jpg', 'Ecran Gamer - AIWA MZ2950-K 29.9\" QHD 165HZ CURVED\r\n', NULL, '967TND', 2, 5, 4),
(16, '2024-05-08 09:57:23.370581', 'jkhkjhkj212', NULL, 'hkj', NULL, NULL, 121, 5, 8);

-- --------------------------------------------------------

--
-- Structure de la table `saved_product`
--

DROP TABLE IF EXISTS `saved_product`;
CREATE TABLE IF NOT EXISTS `saved_product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `creation_date` datetime(6) DEFAULT NULL,
  `post_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3lg3y0u4etvtwatj1nlm937aj` (`post_id`),
  KEY `FKpxfdk99w98pjac4diwvam3asm` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `cart_product`
--
ALTER TABLE `cart_product`
  ADD CONSTRAINT `FK2kdlr8hs2bwl14u8oop49vrxi` FOREIGN KEY (`product_id`) REFERENCES `product` (`id_product`),
  ADD CONSTRAINT `FK46vp2quu7cccp3eijdoqhtpka` FOREIGN KEY (`user_id`) REFERENCES `our_users` (`id`),
  ADD CONSTRAINT `FKlelvbe02il5993s3216lj10t1` FOREIGN KEY (`post_id`) REFERENCES `product` (`id_product`);

--
-- Contraintes pour la table `commande_products`
--
ALTER TABLE `commande_products`
  ADD CONSTRAINT `FK9fwclpgwbvyu7c1s51ydc9nid` FOREIGN KEY (`products_id_product`) REFERENCES `product` (`id_product`),
  ADD CONSTRAINT `FKh90ly5bode63y9iua5083jdbc` FOREIGN KEY (`commande_id`) REFERENCES `commande` (`id`);

--
-- Contraintes pour la table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK1mtsbur82frn64de7balymq9s` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `FKjcy9gjqju1fp7u5sp1thodw9` FOREIGN KEY (`user_id`) REFERENCES `our_users` (`id`);

--
-- Contraintes pour la table `saved_product`
--
ALTER TABLE `saved_product`
  ADD CONSTRAINT `FK3lg3y0u4etvtwatj1nlm937aj` FOREIGN KEY (`post_id`) REFERENCES `product` (`id_product`),
  ADD CONSTRAINT `FKpxfdk99w98pjac4diwvam3asm` FOREIGN KEY (`user_id`) REFERENCES `our_users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
