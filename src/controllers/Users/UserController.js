const DataModel = require('../../models/Users/UsersModel')
const OTPModel = require('../../models/Users/OTPSModel')

const UserCreateService = require('../../services/user/UserCreateService')
const UserLogingService = require('../../services/user/UserLoginService')
const UserUpdateService = require('../../services/user/UserUpdateService')
const UserDetailsServide = require('../../services/user/UserDetailsService')
const UserVerifyEmailService = require('../../services/user/UserVerifyEmailService')
const UserVerifyOTPService = require('../../services/user/UserVerifyOTPService')
const UserResetPassService = require('../../services/user/UserResetPassService')




exports.Registration = async (req, res) => {
    const Result = await UserCreateService(req, DataModel)
    res.status(200).json(Result)
}

exports.Login = async (req, res) => {
    const Result = await UserLogingService(req, DataModel)
    res.status(200).json(Result)
}


exports.ProfileUpdate = async (req, res) => {
    const Result = await UserUpdateService(req, DataModel)
    res.status(200).json(Result)
}


exports.ProfileDetails = async (req, res) => {
    const Result = await UserDetailsServide(req, DataModel)
    res.status(200).json(Result)
}


exports.RecoverVerifyEmail = async (req, res) => {
    const Result = await UserVerifyEmailService(req, DataModel)
    res.status(200).json(Result)
}

exports.RecoverVerifyOTP = async (req, res) => {
    const Result = await UserVerifyOTPService(req, OTPModel)
    res.status(200).json(Result)
}

exports.RecoverResetPass = async (req, res) => {
    const Result = await UserResetPassService(req, DataModel)
    res.status(200).json(Result)
}
