const jwt = require('jsonwebtoken');
const { User } = require('../models');

async function authentication(req, res, next) {
    try {
        const accessToken = req.headers.authorization?.split(' ')[1];

        if (!accessToken) {
            throw { status: 400, message: 'Unauthorized'};
        }

        const decode = jwt.verify(accessToken, process.env.JWT_SECRET);
        console.log(decode);
        const user = await User.findOne({
            where: {
                id: decode.id
            }
        });

        if(!user) {
            throw { status: 400, message: 'email or password'};
        }

        req.user = decode;

        next();
    } catch (error) {
        next(error)
    }
}

module.exports = authentication;