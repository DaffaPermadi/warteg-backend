const { Time_Slot }  = require('../models');

class TimeSlotControllers {
    static async getAllSlotItems(req, res, next) {
        try {
            const slots = await Time_Slot.findAll();
            res.status(200).json(slots);
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TimeSlotControllers;