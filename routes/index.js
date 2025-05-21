const ProductControllers = require('../controllers/ProductControllers');
const TimeSlotControllers = require('../controllers/TimeSlotControllers');
const UserControllers = require('../controllers/UserControllers');
const CartControllers = require('../controllers/CartControllers');
const authentication = require('../middleware/authentication');
const route = require('express').Router();

route.get('/', (req, res) => {
    res.send('TEST ROUTING');
})

route.post('/api/register', UserControllers.userRegister);
route.post('/api/login', UserControllers.userLogin);

<<<<<<< HEAD
route.get('/api/menu', ProductControllers.getAllMenuItems);

route.get('/api/slots', TimeSlotControllers.getAllSlotItems);
=======
route.get('/api/cart', authentication ,CartControllers.getCart);
>>>>>>> bae7572 (feat: authentication done)

module.exports = route;