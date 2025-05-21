const route = require('express').Router();

route.get('/', (req, res) => {
    res.send('TEST ROUTING');
})

module.exports = route;