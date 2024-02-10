const OTPModel = require("../../models/Users/OTPSModel")

const UserResetPassService = async (Request, DataModel) => {
    try {
        const email = Request.body['email']
        const OTPCode = Request.body['OTP']
        const NewPass = Request.body['password']
        const statusUpdate = 1

        // User count
        const OTPUsedCount = await OTPModel.aggregate([{$match: {email: email, otp: OTPCode, status: statusUpdate}}, {$count: 'Total'}])
        
        if (OTPUsedCount.length > 0) {
            const UpdatePass = await DataModel.updateOne({email: email}, {password: NewPass})
            return {status: 'successfull', data: UpdatePass}
        } else {
            return {status: 'fail', data: 'Invalid Request.'}
        }
    } catch (error) {
        return {status: 'fail', data: error.toString()}
    }
}

module.exports = UserResetPassService