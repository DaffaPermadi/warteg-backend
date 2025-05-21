'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return await queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        phone_number: '+6281234567890',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jane Smith',
        phone_number: '+6281234567891',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ahmad Rizky',
        phone_number: '+6281234567892',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Siti Rahma',
        phone_number: '+6281234567893',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Michael Lee',
        phone_number: '+6281234567894',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
