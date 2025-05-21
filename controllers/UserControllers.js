const { User } = require('../models');

class UserControllers {
    static async userRegister(req, res, next) {
        try {
            console.log('INI CONTROLLER');

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
        res.send('LOGIN KE CONTROLLER');
        try {
            const { phone_number } = req.body;

            if( !phone_number ) {
                throw { status: 400, message: 'Bad Request' };
            }

            let user = await User.findOne({
                phone_number
            })

            if(!user) {
                throw { status: 400, message: 'email or password'};
            }

            let userDecode = {
                name: user.name,
                phone_number: user.phone_number
            }

            const token = jwt.sign(userDecode, process.env.JWT_SECRET);
            res.json({ accessToken: token })
                
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserControllers;