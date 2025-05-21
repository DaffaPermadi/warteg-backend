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
   // First, get the user IDs and time slot IDs
   const users = await queryInterface.sequelize.query(
    'SELECT id FROM "Users";',
    { type: queryInterface.sequelize.QueryTypes.SELECT }
  );
  
  const timeSlots = await queryInterface.sequelize.query(
    'SELECT id FROM "Time_Slots";',
    { type: queryInterface.sequelize.QueryTypes.SELECT }
  );

  // Create some sample orders
  return await queryInterface.bulkInsert('Orders', [
    {
      user_id: users[0].id,
      slot_id: timeSlots[2].id,
      type: 'dine_in',
      status: 'confirmed',
      total_price: 47000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      user_id: users[1].id,
      slot_id: timeSlots[4].id,
      type: 'pick_up',
      status: 'preparing',
      total_price: 37000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      user_id: users[2].id,
      slot_id: timeSlots[3].id,
      type: 'dine_in',
      status: 'waiting_payment',
      total_price: 65000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      user_id: users[0].id,
      slot_id: timeSlots[6].id,
      type: 'pick_up',
      status: 'ready',
      total_price: 25000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      user_id: users[3].id,
      slot_id: timeSlots[5].id,
      type: 'dine_in',
      status: 'cart',
      total_price: 52000,
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
