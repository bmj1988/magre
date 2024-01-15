'use strict';
import hex_seeds from "../../utils/hex_seeds";
const { Hexagram } = require('../models')
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Hexagram.bulkCreate(hex_seeds, {
      validate: true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Hexagrams', {})
  }
};
