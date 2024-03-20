const { User } = require("../models");
const { signToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/byrcrpt");

class AuthController {
    static async register(req, res, next) {
        try {
            const {
                name,
                email,
                password
            } = req.body;

            await User.create({
                name,
                email,
                password
            });

            const newUser = { email, name }
            res.status(201).json({ message: "new user register coming up", newUser });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            // console.log(req.body, "<<<<< req.body");
            const { email, password } = req.body;
            if (!email) {
                throw {
                    name: "EmailIsEmpty",
                };
            }
            if (!password) {
                throw {
                    name: "PasswordIsEmpty",
                };
            }

            const user = await User.findOne({
                where: { email },
            });
            // console.log(user, "<<< user data coming in");
            if (!user) {
                throw {
                    name: "InvalidLogin",
                };
            }

            const userPassword = comparePassword(password, user.password);
            if (!userPassword) {
                throw {
                    name: "InvalidLogin",
                };
            }
            // console.log(userPassword, "<<<< user password coming in");

            const payload = {
                id: user.id,
            };

            const token = signToken(payload);

            res.status(200).json({ message: "Success Login", token });

        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = AuthController;
