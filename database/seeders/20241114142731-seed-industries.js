'use strict';

const industries = require("./constants/industries");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('industry', industries)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('industry')
  }
};
