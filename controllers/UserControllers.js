const { User } = require('../models');
const jwt = require('jsonwebtoken');

class UserControllers {
    static async userRegister(req, res, next) {
        try {
            const { name, phone_number } = req.body;

            const uniqueValue = await User.findOne({
                where: {
                    phone_number
                }
            });

            if (uniqueValue) {
                throw { stat: "400", message: "Email already exist!"};
            }

            if(!name || !phone_number) {
                throw { status: 400, message: "Bad Request" };
            }

            let inputUser = { 
                name,
                phone_number
            }

            let result = await User.create(inputUser);

            res.status(201).json(result);
        } catch (error) {
            next(error)
        }
    }

    static async userLogin(req, res, next) {
        try {
            const { phone_number } = req.body;

            if( !phone_number ) {
                throw { status: 400, message: 'Bad Request' };
            }

            let user = await User.findOne({
                where: {
                    phone_number
                }
            })

            if(!user) {
                throw { status: 400, message: 'email or password'};
            }

            let userDecode = {
                id: user.id,
                name: user.name,
                phone_number: user.phone_number
            }
            console.log('user decode ', userDecode);

            const token = jwt.sign(userDecode, process.env.JWT_SECRET);
            res.json({ accessToken: token })
                
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserControllers;