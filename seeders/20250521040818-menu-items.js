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
        description: 'Nasi goreng dengan potongan ayam, udang, telur, dan sayuran segar',
        category: 'food',
        image: 'nasi-goreng.jpg',
        rating: 4.8,
        available_stock: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mie Ayam Bakso',
        price: 22000,
        description: 'Mie dengan potongan ayam dan bakso sapi, disajikan dengan kuah kaldu gurih',
        category: 'food',
        image: 'mie-ayam-bakso.jpg',
        rating: 4.6,
        available_stock: 45,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ayam Bakar',
        price: 30000,
        description: 'Ayam yang dibakar dengan bumbu khas Indonesia, disajikan dengan sambal dan lalapan',
        category: 'food',
        image: 'ayam-bakar.jpg',
        rating: 4.7,
        available_stock: 35,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Es Teh Manis',
        price: 5000,
        description: 'Teh manis segar dengan es batu',
        category: 'drinks',
        image: 'es-teh.jpg',
        rating: 4.5,
        available_stock: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Es Jeruk',
        price: 7000,
        description: 'Jeruk segar diperas dengan tambahan gula dan es batu',
        category: 'drinks',
        image: 'es-jeruk.jpg',
        rating: 4.4,
        available_stock: 80,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sate Ayam',
        price: 20000,
        description: 'Potongan daging ayam yang ditusuk dan dipanggang, disajikan dengan bumbu kacang',
        category: 'food',
        image: 'sate-ayam.jpg',
        rating: 4.9,
        available_stock: 40,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Gado-gado',
        price: 15000,
        description: 'Campuran sayuran segar dengan tahu, tempe, dan telur yang disiram dengan saus kacang',
        category: 'food',
        image: 'gado-gado.jpg',
        rating: 4.3,
        available_stock: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Soto Ayam',
        price: 18000,
        description: 'Sup ayam tradisional dengan kuah kuning, disajikan dengan tauge, telur, dan bihun',
        category: 'food',
        image: 'soto-ayam.jpg',
        rating: 4.5,
        available_stock: 25,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kerupuk Udang',
        price: 5000,
        description: 'Kerupuk renyah dengan rasa udang',
        category: 'additional',
        image: 'kerupuk-udang.jpg',
        rating: 4.2,
        available_stock: 150,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Es Kopi Susu',
        price: 12000,
        description: 'Kopi dengan campuran susu segar dan gula aren, disajikan dengan es',
        category: 'drinks',
        image: 'es-kopi-susu.jpg',
        rating: 4.7,
        available_stock: 60,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sambal Terasi',
        price: 3000,
        description: 'Sambal pedas dengan campuran terasi udang',
        category: 'additional',
        image: 'sambal-terasi.jpg',
        rating: 4.8,
        available_stock: 200,
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
