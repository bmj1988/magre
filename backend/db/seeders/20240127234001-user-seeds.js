const bcrypt = require('bcryptjs')
'use strict';
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

const getEmails = (arr) => {
  const newArr = []
  for (let x of arr) {
    newArr.push(x.email)
  }
  return newArr
}


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
    await User.bulkCreate(userSeeds, { validate: true })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options, {
      email: { [Op.in]: getEmails(userSeeds) }
    }, {})
  }
};
