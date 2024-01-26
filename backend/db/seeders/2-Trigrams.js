'use strict';
const trigram_seeds = require("../../utils/trigram_seeds");
const { Trigram } = require('../models/')
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Trigram.bulkCreate(trigram_seeds, { validate: true })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Trigrams', {})
  }
};
