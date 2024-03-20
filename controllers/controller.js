
const { Product, User } = require('../models')

class Controller{

    static async placeBid(req,res,next){
        console.log(param);
        const {name , price} = param

        try {
            // const data = await Product.findByPk()
            await data.update({
                last_bidder : req.user.id,
                price
            })
        } catch (error) {
            next(error)
        }
    }


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

    static async addProduct(req, res, next) {
        try {
            const {
                name,
                price,
                last_bidder,
                imageUrl
            } = req.body;

            let products = await Product.create({
                name,
                price,
                last_bidder,
                imageUrl
            });

            res.status(201).json({ message: "New product has been created", products });
        } catch (error) {
            console.log(error.message);
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