const OTPModel = require("../../models/Users/OTPSModel")
const SendEmailUtility = require("../../utility/SendEmailUtility")


const UserVerifyEmailService = async (Request, DataModel) => {
    try {
        // Email Account Query
        const email = Request.params.email
        const OTPCode = Math.floor(100000 + Math.random() * 90000)

        // Database first process
        const UserCount = await DataModel.aggregate([{$match: {email: email}}, {$count: 'Total'}])
        if (UserCount.length > 0) {
            // Create OTP code Second process
            await OTPModel.create({email: email, otp: OTPCode})

            // Send Email
            const SendEmail = await SendEmailUtility(email, 'Your PIN Code is = ' + OTPCode, ' Inventory PIN Veryfication.')
            return {status: 'successfull', data: SendEmail}
        } else {
            return {status: 'fail', data: 'No User Found !'}
        }
    } catch (error) {
        return {status: 'fail', data: error.toString()}
    }
}


module.exports = UserVerifyEmailService
