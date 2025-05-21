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
       // Get the user IDs
       const users = await queryInterface.sequelize.query(
        'SELECT id FROM "Users";',
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      );
  
      // Create sample notifications
      return queryInterface.bulkInsert('Notifications', [
        {
          user_id: users[0].id,
          message: 'Your order has been confirmed! It will be ready at your selected time slot.',
          read: true,
          createdAt: new Date(new Date().getTime() - 3600000), // 1 hour ago
          updatedAt: new Date(new Date().getTime() - 3600000)
        },
        {
          user_id: users[0].id,
          message: 'Your order is ready for pickup!',
          read: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: users[1].id,
          message: 'Your order is now being prepared by our chefs!',
          read: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: users[2].id,
          message: 'Please complete your payment to confirm your order.',
          read: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: users[3].id,
          message: 'Your cart items are waiting. Complete your order!',
          read: true,
          createdAt: new Date(new Date().getTime() - 7200000), // 2 hours ago
          updatedAt: new Date(new Date().getTime() - 7200000)
        },
        {
          user_id: users[4].id,
          message: 'Welcome to our app! Place your first order today.',
          read: true,
          createdAt: new Date(new Date().getTime() - 86400000), // 1 day ago
          updatedAt: new Date(new Date().getTime() - 86400000)
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
