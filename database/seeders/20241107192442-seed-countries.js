'use strict';

const countries  =  require("./constants/countries");

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('country', countries)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('country')
  }
};
