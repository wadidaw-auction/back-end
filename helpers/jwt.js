const jwt = require('jsonwebtoken');
const secret = "GanjarPranowo"

const { User } = require('../models')

const signToken = (payload) => {
    return jwt.sign(payload, secret)
}

const verifyToken = (token) => {
    return jwt.verify(token, secret)
}

const getUserByToken = async (token) => {
    let verify = verifyToken(token)
    // console.log(verify,"di getuser");
    try {
        const data = await User.findByPk(verify.id)
        // console.log(data, "dataaa");
        return data
    } catch (error) {
        
    }
}

module.exports = {
    signToken,
    verifyToken,
    getUserByToken
};
