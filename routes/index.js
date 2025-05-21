const UserControllers = require('../controllers/UserControllers');
const route = require('express').Router();

route.get('/', (req, res) => {
    res.send('TEST ROUTING');
})

route.post('/api/register', UserControllers.userRegister);

route.post('/api/login', UserControllers.userLogin);

module.exports = route;