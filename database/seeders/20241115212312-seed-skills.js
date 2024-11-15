'use strict';

const skills = require('./constants/skills')

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('skill', skills);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('skill');
  }
};
