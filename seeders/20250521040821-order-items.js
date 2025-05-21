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
       // Get the order IDs
       const orders = await queryInterface.sequelize.query(
        'SELECT id FROM "Orders";',
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      );
      
      // Get the menu item IDs and prices
      const menuItems = await queryInterface.sequelize.query(
        'SELECT id, price FROM "Menu_Items";',
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      );
  
      // Create order items
      const orderItems = [
        // Order 1 items
        {
          order_id: orders[0].id,
          menu_item_id: menuItems[0].id, // Nasi Goreng Spesial
          quantity: 1,
          price_per_item: menuItems[0].price,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          order_id: orders[0].id,
          menu_item_id: menuItems[3].id, // Es Teh Manis
          quantity: 2,
          price_per_item: menuItems[3].price,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          order_id: orders[0].id,
          menu_item_id: menuItems[5].id, // Sate Ayam
          quantity: 1,
          price_per_item: menuItems[5].price,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        
        // Order 2 items
        {
          order_id: orders[1].id,
          menu_item_id: menuItems[1].id, // Mie Ayam Bakso
          quantity: 1,
          price_per_item: menuItems[1].price,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          order_id: orders[1].id,
          menu_item_id: menuItems[4].id, // Es Jeruk
          quantity: 1,
          price_per_item: menuItems[4].price,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          order_id: orders[1].id,
          menu_item_id: menuItems[6].id, // Gado-gado
          quantity: 1,
          price_per_item: menuItems[6].price,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        
        // Order 3 items
        {
          order_id: orders[2].id,
          menu_item_id: menuItems[2].id, // Ayam Bakar
          quantity: 2,
          price_per_item: menuItems[2].price,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          order_id: orders[2].id,
          menu_item_id: menuItems[3].id, // Es Teh Manis
          quantity: 1,
          price_per_item: menuItems[3].price,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        
        // Order 4 items
        {
          order_id: orders[3].id,
          menu_item_id: menuItems[0].id, // Nasi Goreng Spesial
          quantity: 1,
          price_per_item: menuItems[0].price,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        
        // Order 5 items
        {
          order_id: orders[4].id,
          menu_item_id: menuItems[7].id, // Soto Ayam
          quantity: 2,
          price_per_item: menuItems[7].price,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          order_id: orders[4].id,
          menu_item_id: menuItems[4].id, // Es Jeruk
          quantity: 2,
          price_per_item: menuItems[4].price,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          order_id: orders[4].id,
          menu_item_id: menuItems[5].id, // Sate Ayam
          quantity: 1,
          price_per_item: menuItems[5].price,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
  
      return queryInterface.bulkInsert('Order_Items', orderItems);
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
