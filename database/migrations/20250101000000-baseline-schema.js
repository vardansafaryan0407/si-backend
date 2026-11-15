'use strict';

/**
 * Baseline schema: the 18 tables Sequelize sync had been creating from the models
 * (dumped from MySQL 8 on 2026-09-07). From here on every schema change is a migration.
 *
 * Safe on a database that already has the tables (CREATE TABLE IF NOT EXISTS), so an
 * existing development database can adopt migrations without being rebuilt.
 * Foreign-key checks are off while creating so the alphabetical order does not matter.
 */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const statements = [
      `CREATE TABLE IF NOT EXISTS \`connect_invites\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`senderId\` int DEFAULT NULL,
  \`receiverId\` int DEFAULT NULL,
  \`message\` varchar(250) DEFAULT NULL,
  \`status\` enum('pending','accepted','rejected') DEFAULT 'pending',
  \`createdAt\` datetime NOT NULL,
  \`updatedAt\` datetime NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`senderId\` (\`senderId\`),
  KEY \`receiverId\` (\`receiverId\`),
  CONSTRAINT \`connect_invites_ibfk_1\` FOREIGN KEY (\`senderId\`) REFERENCES \`user\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT \`connect_invites_ibfk_2\` FOREIGN KEY (\`receiverId\`) REFERENCES \`user\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`,
      `CREATE TABLE IF NOT EXISTS \`connections\` (
  \`userId\` int NOT NULL,
  \`friendId\` int NOT NULL,
  \`createdAt\` datetime NOT NULL,
  \`updatedAt\` datetime NOT NULL,
  PRIMARY KEY (\`userId\`,\`friendId\`),
  KEY \`friendId\` (\`friendId\`),
  CONSTRAINT \`connections_ibfk_1\` FOREIGN KEY (\`userId\`) REFERENCES \`user\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT \`connections_ibfk_2\` FOREIGN KEY (\`friendId\`) REFERENCES \`user\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`,
      `CREATE TABLE IF NOT EXISTS \`country\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`name\` varchar(100) NOT NULL,
  \`code\` varchar(10) NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`,
      `CREATE TABLE IF NOT EXISTS \`equity\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`min\` int NOT NULL DEFAULT '0',
  \`max\` int NOT NULL DEFAULT '0',
  \`actual_percent\` int DEFAULT '0',
  \`project_position_id\` int DEFAULT NULL,
  \`createdAt\` datetime NOT NULL,
  \`updatedAt\` datetime NOT NULL,
  \`member_id\` int DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`project_position_id\` (\`project_position_id\`),
  KEY \`member_id\` (\`member_id\`),
  CONSTRAINT \`equity_ibfk_1\` FOREIGN KEY (\`project_position_id\`) REFERENCES \`project_positions\` (\`id\`) ON UPDATE CASCADE,
  CONSTRAINT \`equity_ibfk_2\` FOREIGN KEY (\`member_id\`) REFERENCES \`project_members\` (\`id\`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`,
      `CREATE TABLE IF NOT EXISTS \`industry\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`name\` varchar(255) NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`,
      `CREATE TABLE IF NOT EXISTS \`messages\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`senderId\` int NOT NULL,
  \`receiverId\` int NOT NULL,
  \`text\` text NOT NULL,
  \`createdAt\` datetime DEFAULT NULL,
  \`updatedAt\` datetime NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`senderId\` (\`senderId\`),
  KEY \`receiverId\` (\`receiverId\`),
  CONSTRAINT \`messages_ibfk_1\` FOREIGN KEY (\`senderId\`) REFERENCES \`user\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT \`messages_ibfk_2\` FOREIGN KEY (\`receiverId\`) REFERENCES \`user\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`,
      `CREATE TABLE IF NOT EXISTS \`premium_users\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`user_id\` int NOT NULL,
  \`status\` enum('premium','default') NOT NULL DEFAULT 'default',
  \`createdAt\` datetime NOT NULL,
  \`updatedAt\` datetime NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`user_id\` (\`user_id\`),
  CONSTRAINT \`premium_users_ibfk_1\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`,
      `CREATE TABLE IF NOT EXISTS \`project\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`title\` varchar(255) NOT NULL,
  \`description\` varchar(255) NOT NULL,
  \`country\` int DEFAULT NULL,
  \`industries\` int DEFAULT NULL,
  \`owner_id\` int DEFAULT NULL,
  \`createdAt\` datetime NOT NULL,
  \`updatedAt\` datetime NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`country\` (\`country\`),
  KEY \`industries\` (\`industries\`),
  KEY \`owner_id\` (\`owner_id\`),
  CONSTRAINT \`project_ibfk_1\` FOREIGN KEY (\`country\`) REFERENCES \`country\` (\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT \`project_ibfk_2\` FOREIGN KEY (\`industries\`) REFERENCES \`industry\` (\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT \`project_ibfk_3\` FOREIGN KEY (\`owner_id\`) REFERENCES \`user\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`,
      `CREATE TABLE IF NOT EXISTS \`project_invite\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`message\` varchar(255) DEFAULT NULL,
  \`position_id\` int DEFAULT NULL,
  \`user_id\` int DEFAULT NULL,
  \`createdAt\` datetime NOT NULL,
  \`updatedAt\` datetime NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`position_id\` (\`position_id\`),
  KEY \`user_id\` (\`user_id\`),
  CONSTRAINT \`project_invite_ibfk_1\` FOREIGN KEY (\`position_id\`) REFERENCES \`project_positions\` (\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT \`project_invite_ibfk_2\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\` (\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`,
      `CREATE TABLE IF NOT EXISTS \`project_member_skills\` (
  \`createdAt\` datetime NOT NULL,
  \`updatedAt\` datetime NOT NULL,
  \`member_id\` int NOT NULL,
  \`skill_id\` int NOT NULL,
  PRIMARY KEY (\`member_id\`,\`skill_id\`),
  KEY \`skill_id\` (\`skill_id\`),
  CONSTRAINT \`project_member_skills_ibfk_1\` FOREIGN KEY (\`member_id\`) REFERENCES \`project_members\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT \`project_member_skills_ibfk_2\` FOREIGN KEY (\`skill_id\`) REFERENCES \`skill\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`,
      `CREATE TABLE IF NOT EXISTS \`project_members\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`user_id\` int NOT NULL,
  \`project_id\` int NOT NULL,
  \`position_id\` int NOT NULL,
  \`application_id\` int NOT NULL,
  \`country_id\` int DEFAULT NULL,
  \`role_id\` int DEFAULT NULL,
  \`status\` enum('active','inactive','removed') NOT NULL DEFAULT 'active',
  \`createdAt\` datetime NOT NULL,
  \`updatedAt\` datetime NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`user_id\` (\`user_id\`),
  KEY \`project_id\` (\`project_id\`),
  KEY \`position_id\` (\`position_id\`),
  KEY \`application_id\` (\`application_id\`),
  KEY \`country_id\` (\`country_id\`),
  KEY \`role_id\` (\`role_id\`),
  CONSTRAINT \`project_members_ibfk_1\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\` (\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT \`project_members_ibfk_2\` FOREIGN KEY (\`project_id\`) REFERENCES \`project\` (\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT \`project_members_ibfk_3\` FOREIGN KEY (\`position_id\`) REFERENCES \`project_positions\` (\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT \`project_members_ibfk_4\` FOREIGN KEY (\`application_id\`) REFERENCES \`project_position_applications\` (\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT \`project_members_ibfk_5\` FOREIGN KEY (\`country_id\`) REFERENCES \`country\` (\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT \`project_members_ibfk_6\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\` (\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`,
      `CREATE TABLE IF NOT EXISTS \`project_position_applications\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`user_id\` int DEFAULT NULL,
  \`position_id\` int DEFAULT NULL,
  \`equity\` int DEFAULT NULL,
  \`message\` longtext NOT NULL,
  \`status\` enum('pending','rejected','approved') NOT NULL DEFAULT 'pending',
  \`createdAt\` datetime NOT NULL,
  \`updatedAt\` datetime NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`user_id\` (\`user_id\`),
  KEY \`position_id\` (\`position_id\`),
  CONSTRAINT \`project_position_applications_ibfk_1\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\` (\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT \`project_position_applications_ibfk_2\` FOREIGN KEY (\`position_id\`) REFERENCES \`project_positions\` (\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`,
      `CREATE TABLE IF NOT EXISTS \`project_position_skills\` (
  \`createdAt\` datetime NOT NULL,
  \`updatedAt\` datetime NOT NULL,
  \`position_id\` int NOT NULL,
  \`skill_id\` int NOT NULL,
  PRIMARY KEY (\`position_id\`,\`skill_id\`),
  KEY \`skill_id\` (\`skill_id\`),
  CONSTRAINT \`project_position_skills_ibfk_1\` FOREIGN KEY (\`position_id\`) REFERENCES \`project_positions\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT \`project_position_skills_ibfk_2\` FOREIGN KEY (\`skill_id\`) REFERENCES \`skill\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`,
      `CREATE TABLE IF NOT EXISTS \`project_positions\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`country\` int DEFAULT NULL,
  \`role_id\` int DEFAULT NULL,
  \`project_id\` int DEFAULT NULL,
  \`description\` varchar(255) DEFAULT NULL,
  \`createdAt\` datetime NOT NULL,
  \`updatedAt\` datetime NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`country\` (\`country\`),
  KEY \`role_id\` (\`role_id\`),
  KEY \`project_id\` (\`project_id\`),
  CONSTRAINT \`project_positions_ibfk_1\` FOREIGN KEY (\`country\`) REFERENCES \`country\` (\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT \`project_positions_ibfk_2\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\` (\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT \`project_positions_ibfk_3\` FOREIGN KEY (\`project_id\`) REFERENCES \`project\` (\`id\`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`,
      `CREATE TABLE IF NOT EXISTS \`role\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`name\` varchar(255) NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`,
      `CREATE TABLE IF NOT EXISTS \`skill\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`name\` varchar(50) DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`,
      `CREATE TABLE IF NOT EXISTS \`user\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`firstName\` varchar(50) NOT NULL,
  \`lastName\` varchar(100) NOT NULL,
  \`description\` varchar(100) DEFAULT NULL,
  \`email\` varchar(50) NOT NULL,
  \`country_id\` int DEFAULT NULL,
  \`password\` varchar(255) NOT NULL,
  \`reset_password_token\` varchar(255) DEFAULT NULL,
  \`reset_password_expires\` datetime DEFAULT NULL,
  \`url\` varchar(255) DEFAULT NULL,
  \`role\` enum('admin','user') NOT NULL DEFAULT 'user',
  \`createdAt\` datetime NOT NULL,
  \`updatedAt\` datetime NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`email\` (\`email\`),
  KEY \`country_id\` (\`country_id\`),
  CONSTRAINT \`user_ibfk_1\` FOREIGN KEY (\`country_id\`) REFERENCES \`country\` (\`id\`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`,
      `CREATE TABLE IF NOT EXISTS \`user_skills\` (
  \`createdAt\` datetime NOT NULL,
  \`updatedAt\` datetime NOT NULL,
  \`user_id\` int NOT NULL,
  \`skill_id\` int NOT NULL,
  PRIMARY KEY (\`user_id\`,\`skill_id\`),
  KEY \`skill_id\` (\`skill_id\`),
  CONSTRAINT \`user_skills_ibfk_1\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT \`user_skills_ibfk_2\` FOREIGN KEY (\`skill_id\`) REFERENCES \`skill\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci`,
    ];
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    try {
      for (const statement of statements) {
        await queryInterface.sequelize.query(statement);
      }
    } finally {
      await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    }
  },

  async down(queryInterface) {
    const tables = ["connect_invites","connections","country","equity","industry","messages","premium_users","project","project_invite","project_member_skills","project_members","project_position_applications","project_position_skills","project_positions","role","skill","user","user_skills"];
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    try {
      for (const table of tables) {
        await queryInterface.sequelize.query('DROP TABLE IF EXISTS `' + table + '`');
      }
    } finally {
      await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    }
  },
};
