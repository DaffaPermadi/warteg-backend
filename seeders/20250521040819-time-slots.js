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
    const timeSlots = [];
    const startHour = 16; // 9:00 AM
    const endHour = 28; // 9:00 PM

    const baseDate = new Date();
    baseDate.setSeconds(0, 0); // Reset seconds and milliseconds

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute of [0, 30]) {
        // Skip the last slot at 21:30
        if (hour === endHour && minute === 30) continue;
        console.log('hour', hour);
        console.log('minute', minute);
        
        // Create start time
        const startTime = new Date(baseDate);
        startTime.setHours(hour, minute);
        
        // Create end time (30 minutes later)
        const endTime = new Date(baseDate);
        // Handle hour transition properly
        if (minute === 30) {
          endTime.setHours(hour + 1, 0);
        } else {
          endTime.setHours(hour, minute + 30);
        }
        
        timeSlots.push({
          start_time: startTime,
          end_time: endTime,
          max_capacity: 15,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }

    return queryInterface.bulkInsert('Time_Slots', timeSlots);
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
