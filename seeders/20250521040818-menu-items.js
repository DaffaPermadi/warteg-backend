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
    return queryInterface.bulkInsert('Menu_Items', [
      {
        name: 'Nasi Goreng Spesial',
        price: 25000,
        available_stock: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mie Ayam Bakso',
        price: 22000,
        available_stock: 45,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ayam Bakar',
        price: 30000,
        available_stock: 35,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Es Teh Manis',
        price: 5000,
        available_stock: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Es Jeruk',
        price: 7000,
        available_stock: 80,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sate Ayam',
        price: 20000,
        available_stock: 40,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Gado-gado',
        price: 15000,
        available_stock: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Soto Ayam',
        price: 18000,
        available_stock: 25,
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
