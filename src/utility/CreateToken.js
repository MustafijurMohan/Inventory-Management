require('dotenv').config()
const jwt = require('jsonwebtoken')
const secretkey = process.env.TOKEN_KEY

const CreateToken = async (data) => {
    const Payload = { exp: Math.floor(Date.now() / 1000 ) + (24 * 60 * 60), data:data }

    return await jwt.sign(Payload, secretkey)
}

module.exports = CreateToken





