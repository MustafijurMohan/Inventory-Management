const mongoose = require('mongoose')

const OTPSModel = mongoose.Schema({
    email: {type: String},
    otp: {type: String},
    status: {type: Number, default: 0},
    CreatedDate: {type: Date, default: Date.now()}
}, {versionKey: false})

const OTPModel = mongoose.model('otps', OTPSModel)
module.exports = OTPModel
