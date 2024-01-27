'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Hexagrams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      composition: {
        type: Sequelize.STRING
      },
      aspect: {
        type: Sequelize.STRING
      },
      guidance: {
        type: Sequelize.TEXT
      },
      wisdom: {
        type: Sequelize.TEXT
      },
      art: {
        type: Sequelize.STRING
      },
      upper: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      lower: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      first: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      second: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      third: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      fourth: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      fifth: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      sixth: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      all: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Hexagrams');
  }
};
