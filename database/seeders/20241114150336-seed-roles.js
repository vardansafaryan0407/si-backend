'use strict';

const roles = require("./constants/roles");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('role', roles)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('role')
  }
};
