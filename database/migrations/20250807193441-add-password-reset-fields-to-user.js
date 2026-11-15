'use strict';

/**
 * Adds the password-reset columns to `user`.
 * Idempotent: the baseline migration (and any database created by Sequelize sync)
 * already carries these columns, so each one is added only when missing.
 */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const columns = await queryInterface.describeTable('user');

    if (!columns.reset_password_token) {
      await queryInterface.addColumn('user', 'reset_password_token', {
        type: Sequelize.STRING(255),
        allowNull: true,
      });
    }

    if (!columns.reset_password_expires) {
      await queryInterface.addColumn('user', 'reset_password_expires', {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('user', 'reset_password_token');
    await queryInterface.removeColumn('user', 'reset_password_expires');
  },
};
