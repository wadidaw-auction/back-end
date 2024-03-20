const { Product } = require('../models')
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
}

module.exports = Controller