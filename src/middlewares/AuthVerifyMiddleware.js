require('dotenv').config()
const jwt = require('jsonwebtoken')
const secretKey = process.env.TOKEN_KEY

module.exports = (req, res, next) => {
    const Token = req.headers['token']
    jwt.verify(Token, secretKey, (err, decode) => {
        if (err) {
            res.status(401).json({status: 'unauthorized'})
        } else {
            const email = decode['data']
            req.headers.email =  email
            next()
        }
    })
}



