const bcrypt = require('bcryptjs')
'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
const { User } = require('../models')
const userSeeds = [
  {
    name: 'Zoey Zodiac',
    email: 'zoe@zodiac.net',
    hashedPw: bcrypt.hashSync('password'),
    stemId: 1,
    branchId: 5,
  },
  {
    name: 'Otis Ox',
    email: 'demo@zodiac.net',
    hashedPw: bcrypt.hashSync('password2'),
    stemId: 4,
    branchId: 2,
  },
  {
    name: 'Jim Journey',
    email: 'jim@zodiac.net',
    hashedPw: bcrypt.hashSync('password'),
    stemId: 9,
    branchId: 7,
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await User.bulkCreate(userSeeds)
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    options.tableName = 'Users'
    await queryInterface.bulkDelete(options, {
      email: { [Op.in]: userSeeds.map((user) => (user.email)) }
    }, {})
  }
};
