'use strict';
const { User } = require('../models')
/// on refactor, look at importing just the hashSync command
const bcrypt = require('bcryptjs')

/// for pg in production
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const users = [
  {
    name: 'Owen Owner',
    email: 'demoOwner@demo.net',
    hashedPw: bcrypt.hashSync('password')
  },
  {
    name: 'Mike Manager',
    email: 'demoManager@demo.net',
    hashedPw: bcrypt.hashSync('password2')
  },
  {
    name: 'Timothy Tenant',
    email: 'demoTenant@demo.net',
    hashedPw: bcrypt.hashSync('password3')
  },
]

const getEmails = (arr) => {
  newArr = []
  for (let x of arr) {
    newArr.push(x.email)
  }
  return newArr
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(users, { validate: true })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {
      email: { [Op.in]: getEmails(users) }
    }, {})
  }
};
