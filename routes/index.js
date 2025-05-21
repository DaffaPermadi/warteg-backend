const ProductControllers = require('../controllers/ProductControllers');
const TimeSlotControllers = require('../controllers/TimeSlotControllers');
const UserControllers = require('../controllers/UserControllers');
const route = require('express').Router();

route.get('/', (req, res) => {
    res.send('TEST ROUTING');
})

route.post('/api/register', UserControllers.userRegister);

route.post('/api/login', UserControllers.userLogin);

route.get('/api/menu', ProductControllers.getAllMenuItems);

route.get('/api/slots', TimeSlotControllers.getAllSlotItems);

module.exports = route;