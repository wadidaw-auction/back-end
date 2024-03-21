
const { Product, User } = require('../models')

class Controller{


    static async showAllProduct(req, res, next) {
        try {
            const product = await Product.findAll({
                include: {
                    model: User,
                    attributes: ["name"]
                }
            });

            res.status(200).json(product);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async showProductById(req, res, next) {
        try {
            // console.log(req.params);
            const product = await Product.findOne({
                where : {
                    id : req.params.id
                },
                attributes: {
                    exclude: ['createdAt','updatedAt']
                },
                include: {
                    model: User,
                    attributes: {
                        exclude: ['password','createdAt','updatedAt']
                    }
                }
            });
            // console.log(product);
            res.status(200).json(product);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async findUserbyId(req, res, next) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id, {
                attributes: ["name"]
            });

            res.status(200).json(user)

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async showAllUser(req, res, next) {
        try {
            const user = await User.findAll({
                attributes: ["id", "name", "email"]
            });

            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

}

module.exports = Controller